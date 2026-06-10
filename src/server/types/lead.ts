export interface Lead {
  id: string;
  agent_id: string;
  form_id: string;
  name: string;
  email: string;
  budget: number | null;
  area: string[];
  property_type: string | null;
  urgency: string | null;
  score: number;
  created_at: Date;
}
