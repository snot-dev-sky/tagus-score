export interface User {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  subscription_active: boolean;
  subscription_end_date?: Date;
  is_admin: boolean;
  last_login?: Date;
  created_at: Date;
}
