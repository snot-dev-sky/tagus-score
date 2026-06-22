import { query, type Queryable } from '../index';
import type { Lead } from '../../types';

const LEAD_COLUMNS = `id, agent_id AS "agentId", form_id AS "formId",
            name, email, contact, budget, approved, district, town, type, notes,
            created_at AS "createdAt"`;

export async function getAgentLeads(
  agentId: string,
  limit: number = 20,
  offset: number = 0,
  executor?: Queryable,
): Promise<{ leads: Lead[]; total: number }> {
  const { rows: leads } = await query<Lead>(
    `SELECT ${LEAD_COLUMNS}
     FROM leads
     WHERE agent_id = $1
     ORDER BY created_at DESC
     LIMIT $2 OFFSET $3`,
    [agentId, limit, offset],
    executor,
  );

  const { rows: countResult } = await query<{ total: string }>(
    `SELECT COUNT(*) as total FROM leads WHERE agent_id = $1`,
    [agentId],
    executor,
  );

  return {
    leads,
    total: parseInt(countResult[0]?.total ?? '0', 10),
  };
}
