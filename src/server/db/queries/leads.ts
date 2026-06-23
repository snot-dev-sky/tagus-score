import { query, type Queryable } from '../index';
import type { Lead } from '../../types';

const LEAD_COLUMNS = `id, agent_id AS "agentId", form_id AS "formId",
            name, email, contact, budget, approved, district, town, type, notes,
            created_at AS "createdAt"`;

export interface CreateLeadInput {
  agentId: string;
  formId: string;
  name: string;
  email: string;
  contact: string;
  budget: number;
  approved: boolean;
  district: string;
  town: string;
  type: string[];
  notes?: string | null;
}

export async function createLead(input: CreateLeadInput, executor?: Queryable): Promise<Lead> {
  const { rows } = await query<Lead>(
    `INSERT INTO leads
       (agent_id, form_id, name, email, contact, budget, approved, district, town, type, notes)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
     RETURNING ${LEAD_COLUMNS}`,
    [
      input.agentId,
      input.formId,
      input.name,
      input.email,
      input.contact,
      input.budget,
      input.approved,
      input.district,
      input.town,
      input.type,
      input.notes ?? null,
    ],
    executor,
  );
  return rows[0];
}

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
