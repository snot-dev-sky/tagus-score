export type Budget = 'budget_1' | 'budget_2' | 'budget_3' | 'budget_4';

export type PropertyType = 'T0' | 'T1' | 'T2' | 'T3_plus';

export type Urgency = 'immediate' | '1_3_months' | '3_6_months';

export interface Lead {
  id: string;
  agent_id: string;
  form_id: string;
  name: string;
  email: string;
  budget: Budget;
  area: string[];
  property_type: PropertyType;
  urgency: Urgency;
  score: number;
  created_at: Date;
}
