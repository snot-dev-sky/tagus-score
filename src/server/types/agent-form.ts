export type AgentFormStatus = 'pending' | 'submitted';

export interface AgentForm {
  id: string;
  agentId: string;
  formId: string;
  status: AgentFormStatus;
  expiresAt: Date;
  createdAt: Date;
}
