CREATE TABLE agent_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  form_id UUID UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_agent_forms_agent_id ON agent_forms(agent_id);
CREATE INDEX idx_agent_forms_form_id ON agent_forms(form_id);
CREATE INDEX idx_agent_forms_expires_at ON agent_forms(expires_at);
