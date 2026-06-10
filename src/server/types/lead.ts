export interface Lead {
  id: string;
  agentId: string;
  formId: string;
  name: string;
  email: string;
  budget: number | null;
  area: string[];
  propertyType: string | null;
  urgency: string | null;
  score: number;
  createdAt: Date;
}
