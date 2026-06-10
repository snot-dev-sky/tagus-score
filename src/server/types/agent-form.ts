export type AgentFormStatus = 'pending' | 'submitted';

export interface AgentForm {
  id: string;
  agent_id: string;
  form_id: string;
  status: AgentFormStatus;
  expires_at: Date;
  created_at: Date;
}
