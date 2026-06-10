CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  form_id UUID NOT NULL REFERENCES agent_forms(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  budget INTEGER,
  area TEXT[] DEFAULT ARRAY[]::TEXT[],
  property_type VARCHAR(100),
  urgency VARCHAR(50),
  score INTEGER CHECK (score >= 0 AND score <= 100),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_leads_agent_id ON leads(agent_id);
CREATE INDEX idx_leads_form_id ON leads(form_id);
CREATE INDEX idx_leads_score ON leads(score);
