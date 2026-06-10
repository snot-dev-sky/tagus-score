CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  auth_provider VARCHAR(50) NOT NULL,
  google_id VARCHAR(255),
  subscription_id UUID NOT NULL REFERENCES subscriptions(id),
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_subscription_id ON users(subscription_id);
CREATE INDEX idx_users_google_id ON users(google_id);
