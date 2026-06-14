import { Router } from 'express';
import type { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { createAgentForm } from '../../db/queries/agent-forms';

const router = Router();

router.post('/me/forms', async (req: Request, res: Response) => {
  try {
    const formId = randomUUID();
    const form = await createAgentForm(req.user!.id, formId);

    return res.status(201).json({
      formId: form.formId,
      link: `${process.env.APP_BASE_URL}/form/${form.formId}`,
      expiresAt: form.expiresAt,
      message: 'Link gerado com sucesso',
    });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
