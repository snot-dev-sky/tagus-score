export type AuthProvider = 'email' | 'google';

export interface User {
  id: string;
  email: string;
  password_hash: string | null;
  name: string;
  is_admin: boolean;
  auth_provider: AuthProvider;
  google_id: string | null;
  subscription_id: string;
  last_login: Date | null;
  created_at: Date;
}
