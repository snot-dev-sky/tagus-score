import { Router } from 'express';
import type { Request, Response } from 'express';
import { getAgentLeads } from '../../db/queries/leads';
import { ErrorCodes } from '../../constants/errorCodes';

const router = Router();

router.get('/me/leads', async (req: Request, res: Response) => {
  try {
    const agentId = req.user!.id;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;

    if (limit < 1 || offset < 0) {
      return res.status(400).json({
        error: 'Invalid pagination parameters',
        errorCode: ErrorCodes.Lead.INVALID_PAGINATION,
      });
    }

    const limitCapped = Math.min(limit, 100);
    const { leads, total } = await getAgentLeads(agentId, limitCapped, offset);

    return res.status(200).json({
      data: leads,
      pagination: {
        total,
        limit: limitCapped,
        offset,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to fetch leads',
      errorCode: ErrorCodes.Lead.FETCH_FAILED,
    });
  }
});

export default router;
