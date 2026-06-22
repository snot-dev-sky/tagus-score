DROP TABLE IF EXISTS leads CASCADE;

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  form_id UUID NOT NULL REFERENCES agent_forms(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  contact VARCHAR(20) NOT NULL,
  budget INTEGER NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT false,
  district VARCHAR(255) NOT NULL,
  town VARCHAR(255) NOT NULL,
  type TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leads_agent_id ON leads(agent_id);
CREATE INDEX idx_leads_form_id ON leads(form_id);
