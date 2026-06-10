export type AgentFormStatus = 'pending' | 'submitted';

export interface AgentForm {
  id: string;
  agent_id: string;
  form_id: string;
  status: AgentFormStatus;
  created_at: Date;
  expires_at: Date;
}
