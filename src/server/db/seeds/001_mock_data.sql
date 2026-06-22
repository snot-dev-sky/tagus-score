-- Mock data: 1 agent (user) + subscription, 5 leads with their agent_forms
\set ON_ERROR_STOP on

-- Subscription for the agent
INSERT INTO subscriptions (status, price_per_month, start_date, end_date)
VALUES ('active', 29.99, NOW() - INTERVAL '2 months', NOW() + INTERVAL '10 months')
RETURNING id AS subscription_id \gset

-- Agent (user)
INSERT INTO users (email, password_hash, name, auth_provider, subscription_id, last_login)
VALUES (
  'joao.silva@tagusscore.pt',
  '$2b$10$kKPVdD7S4YIBneAxyos8mOVa4AdTrriQGynAY3vGX5mSzPY1VOrIC', -- Test1234!
  'João Silva',
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
INSERT INTO leads (agent_id, form_id, name, email, contact, budget, approved, district, town, type, notes)
VALUES (:'agent_id', :'form1_id', 'Maria Santos', 'maria.santos@example.com', '912345678', 250000, true, 'Lisboa', 'Cascais', ARRAY['t1', 't2', 'apartment'], 'Cliente com urgência, perto do centro comercial');

INSERT INTO leads (agent_id, form_id, name, email, contact, budget, approved, district, town, type, notes)
VALUES (:'agent_id', :'form2_id', 'Pedro Costa', 'pedro.costa@example.com', '923456789', 450000, true, 'Lisboa', 'Oeiras', ARRAY['t2', 't3', 'moradia'], 'Interessado em morada com espaço exterior');

INSERT INTO leads (agent_id, form_id, name, email, contact, budget, approved, district, town, type, notes)
VALUES (:'agent_id', :'form3_id', 'Ana Ferreira', 'ana.ferreira@example.com', '934567890', 180000, false, 'Porto', 'Porto', ARRAY['t0', 't1'], 'Procura apartamento pequeno, orçamento reduzido');

INSERT INTO leads (agent_id, form_id, name, email, contact, budget, approved, district, town, type, notes)
VALUES (:'agent_id', :'form4_id', 'Rui Oliveira', 'rui.oliveira@example.com', '945678901', 600000, true, 'Lisboa', 'Sintra', ARRAY['t3', 't4', 'moradia'], 'Cliente VIP, comprador seguro, perto de zona verde');

INSERT INTO leads (agent_id, form_id, name, email, contact, budget, approved, district, town, type, notes)
VALUES (:'agent_id', :'form5_id', 'Tiago Pereira', 'tiago.pereira@example.com', '956789012', 800000, false, 'Setúbal', 'Almada', ARRAY['t3_plus', 'moradia'], 'Procura propriedade grande, negociável no preço');
