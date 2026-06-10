-- Mock data: 1 agent (user) + subscription, 5 leads with their agent_forms
\set ON_ERROR_STOP on

-- Subscription for the agent
INSERT INTO subscriptions (status, price_per_month, start_date, end_date)
VALUES ('active', 29.99, NOW() - INTERVAL '2 months', NOW() + INTERVAL '10 months')
RETURNING id AS subscription_id \gset

-- Agent (user)
INSERT INTO users (email, password_hash, name, is_admin, auth_provider, subscription_id, last_login)
VALUES (
  'joao.silva@tagusscore.pt',
  '$2b$10$CwTycUXWue0Thq9StjUM0uJ8gNW2Gp3JEzZ.Q4/ItVhLFfA9Sjmre',
  'João Silva',
  false,
  'email',
  :'subscription_id',
  NOW() - INTERVAL '1 day'
)
RETURNING id AS agent_id \gset

-- One agent_form per lead
INSERT INTO agent_forms (agent_id, form_id, status, expires_at)
VALUES (:'agent_id', gen_random_uuid(), 'submitted', NOW() + INTERVAL '20 days')
RETURNING id AS form1_id \gset

INSERT INTO agent_forms (agent_id, form_id, status, expires_at)
VALUES (:'agent_id', gen_random_uuid(), 'submitted', NOW() + INTERVAL '25 days')
RETURNING id AS form2_id \gset

INSERT INTO agent_forms (agent_id, form_id, status, expires_at)
VALUES (:'agent_id', gen_random_uuid(), 'submitted', NOW() + INTERVAL '30 days')
RETURNING id AS form3_id \gset

INSERT INTO agent_forms (agent_id, form_id, status, expires_at)
VALUES (:'agent_id', gen_random_uuid(), 'submitted', NOW() + INTERVAL '15 days')
RETURNING id AS form4_id \gset

INSERT INTO agent_forms (agent_id, form_id, status, expires_at)
VALUES (:'agent_id', gen_random_uuid(), 'submitted', NOW() + INTERVAL '10 days')
RETURNING id AS form5_id \gset

-- Leads
INSERT INTO leads (agent_id, form_id, name, email, budget, area, property_type, urgency, score, created_at)
VALUES (:'agent_id', :'form1_id', 'Maria Santos', 'maria.santos@example.com', 250000, ARRAY['Lisboa', 'Cascais'], 'apartment', 'high', 85, NOW() - INTERVAL '2 days');

INSERT INTO leads (agent_id, form_id, name, email, budget, area, property_type, urgency, score, created_at)
VALUES (:'agent_id', :'form2_id', 'Pedro Costa', 'pedro.costa@example.com', 450000, ARRAY['Sintra', 'Oeiras'], 'house', 'medium', 65, NOW() - INTERVAL '4 days');

INSERT INTO leads (agent_id, form_id, name, email, budget, area, property_type, urgency, score, created_at)
VALUES (:'agent_id', :'form3_id', 'Ana Ferreira', 'ana.ferreira@example.com', 180000, ARRAY['Lisboa'], 'apartment', 'low', 40, NOW() - INTERVAL '6 days');

INSERT INTO leads (agent_id, form_id, name, email, budget, area, property_type, urgency, score, created_at)
VALUES (:'agent_id', :'form4_id', 'Rui Oliveira', 'rui.oliveira@example.com', 600000, ARRAY['Mafra', 'Sintra'], 'land', 'high', 92, NOW() - INTERVAL '1 days');

INSERT INTO leads (agent_id, form_id, name, email, budget, area, property_type, urgency, score, created_at)
VALUES (:'agent_id', :'form5_id', 'Tiago Pereira', 'tiago.pereira@example.com', 800000, ARRAY['Almada', 'Seixal'], 'commercial', 'medium', 70, NOW() - INTERVAL '8 days');
