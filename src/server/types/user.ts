export type AuthProvider = 'email' | 'google';

export interface User {
  id: string;
  email: string;
  passwordHash: string | null;
  name: string;
  authProvider: AuthProvider;
  googleId: string | null;
  subscriptionId: string;
  lastLogin: Date | null;
  createdAt: Date;
}
