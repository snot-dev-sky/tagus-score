import { query, type Queryable } from '../index';
import type { AgentForm } from '../../types';

const AGENT_FORM_COLUMNS = `id, agent_id AS "agentId", form_id AS "formId", status,
            expires_at AS "expiresAt", created_at AS "createdAt"`;

export async function createAgentForm(
  agentId: string,
  formId: string,
  executor?: Queryable,
): Promise<AgentForm> {
  const { rows } = await query<AgentForm>(
    `INSERT INTO agent_forms (agent_id, form_id, expires_at)
     VALUES ($1, $2, NOW() + INTERVAL '30 days')
     RETURNING ${AGENT_FORM_COLUMNS}`,
    [agentId, formId],
    executor,
  );
  return rows[0];
}
