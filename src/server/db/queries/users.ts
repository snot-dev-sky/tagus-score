import { query } from '../index';
import type { User } from '../../types';

export async function findUserByEmail(email: string): Promise<User | null> {
  const { rows } = await query<User>(
    `SELECT id, email, password_hash AS "passwordHash", name,
            auth_provider AS "authProvider", google_id AS "googleId",
            subscription_id AS "subscriptionId", last_login AS "lastLogin",
            created_at AS "createdAt"
     FROM users WHERE email = $1`,
    [email],
  );
  return rows[0] ?? null;
}

export async function updateLastLogin(userId: string): Promise<void> {
  await query('UPDATE users SET last_login = NOW() WHERE id = $1', [userId]);
}
