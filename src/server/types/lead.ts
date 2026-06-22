export interface Lead {
  id: string;
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
  notes: string;
  createdAt: string;
}
