import { Router } from 'express';
import type { Request, Response } from 'express';
import { transaction } from '../../db';
import { findAgentFormByFormId, markAgentFormSubmitted } from '../../db/queries/agent-forms';
import { createLead } from '../../db/queries/leads';
import { formSubmissionRateLimit } from '../../middleware/rate-limit';
import { ErrorCodes } from '../../constants/errorCodes';
import {
  validateEmail,
  validateContact,
  validateBudget,
  validateDistrict,
  validateLeadType,
  isNonEmptyString,
  isValidUuid,
} from '../../utils';

const router = Router();

// Public endpoint: the public form page validates the link before rendering.
// Mirrors the guards in POST /:formId/submit (not found / expired / already used).
router.get('/:formId', async (req: Request, res: Response) => {
  const { formId } = req.params;

  if (!isValidUuid(formId)) {
    return res.status(404).json({ error: 'Form not found', errorCode: ErrorCodes.Form.NOT_FOUND });
  }

  try {
    const form = await findAgentFormByFormId(formId);

    if (!form) {
      return res
        .status(404)
        .json({ error: 'Form not found', errorCode: ErrorCodes.Form.NOT_FOUND });
    }

    if (new Date(form.expiresAt).getTime() < Date.now()) {
      return res.status(410).json({ error: 'Form expired', errorCode: ErrorCodes.Form.EXPIRED });
    }

    if (form.status !== 'pending') {
      return res
        .status(400)
        .json({ error: 'Form already used', errorCode: ErrorCodes.Form.ALREADY_USED });
    }

    return res.status(200).json({
      formId: form.formId,
      status: form.status,
      expiresAt: form.expiresAt,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: (error as Error).message, errorCode: ErrorCodes.Form.LOOKUP_FAILED });
  }
});

interface SubmitFormBody {
  name?: string;
  email?: string;
  contact?: string;
  budget?: number;
  approved?: boolean;
  district?: string;
  town?: string;
  type?: string[];
  notes?: string;
}

// Public endpoint: a client submits an agent's form. No authentication.
router.post(
  '/:formId/submit',
  formSubmissionRateLimit,
  async (req: Request, res: Response) => {
    const { formId } = req.params;
    const body = req.body as SubmitFormBody;

    try {
      const form = await findAgentFormByFormId(formId);

      if (!form) {
        return res
          .status(404)
          .json({ error: 'Form not found', errorCode: ErrorCodes.Form.NOT_FOUND });
      }

      if (new Date(form.expiresAt).getTime() < Date.now()) {
        return res.status(410).json({ error: 'Form expired', errorCode: ErrorCodes.Form.EXPIRED });
      }

      if (form.status !== 'pending') {
        return res
          .status(400)
          .json({ error: 'Form already used', errorCode: ErrorCodes.Form.ALREADY_USED });
      }

      // Field validation
      if (!isNonEmptyString(body.name) || !isNonEmptyString(body.town)) {
        return res.status(400).json({
          error: 'Name and town are required',
          errorCode: ErrorCodes.Form.MISSING_FIELDS,
        });
      }

      if (!validateEmail(body.email)) {
        return res
          .status(400)
          .json({ error: 'Invalid email format', errorCode: ErrorCodes.Form.INVALID_EMAIL });
      }

      if (!validateContact(body.contact)) {
        return res.status(400).json({
          error: 'Contact must be exactly 9 digits',
          errorCode: ErrorCodes.Form.INVALID_CONTACT,
        });
      }

      if (!validateBudget(body.budget)) {
        return res.status(400).json({
          error: 'Budget must be a positive integer',
          errorCode: ErrorCodes.Form.INVALID_BUDGET,
        });
      }

      if (!validateDistrict(body.district)) {
        return res
          .status(400)
          .json({ error: 'Invalid district', errorCode: ErrorCodes.Form.INVALID_DISTRICT });
      }

      if (!validateLeadType(body.type)) {
        return res.status(400).json({
          error: 'Type must be a non-empty array of strings',
          errorCode: ErrorCodes.Form.INVALID_TYPE,
        });
      }

      const lead = await transaction(async (client) => {
        const created = await createLead(
          {
            agentId: form.agentId,
            formId: form.id,
            name: body.name!.trim(),
            email: body.email!,
            contact: body.contact!,
            budget: body.budget!,
            approved: body.approved ?? false,
            district: body.district!,
            town: body.town!.trim(),
            type: body.type!,
            notes: isNonEmptyString(body.notes) ? body.notes.trim() : null,
          },
          client,
        );
        await markAgentFormSubmitted(form.id, client);
        return created;
      });

      return res.status(201).json({
        leadId: lead.id,
        message: 'Formulário recebido com sucesso',
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: (error as Error).message, errorCode: ErrorCodes.Form.SUBMIT_FAILED });
    }
  },
);

export default router;
