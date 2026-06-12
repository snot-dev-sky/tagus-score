import { query, type Queryable } from '../index';
import type { User } from '../../types';

const USER_COLUMNS = `id, email, password_hash AS "passwordHash", name,
            auth_provider AS "authProvider", google_id AS "googleId",
            subscription_id AS "subscriptionId", last_login AS "lastLogin",
            created_at AS "createdAt"`;

export async function findUserByEmail(email: string, executor?: Queryable): Promise<User | null> {
  const { rows } = await query<User>(
    `SELECT ${USER_COLUMNS} FROM users WHERE email = $1`,
    [email],
    executor,
  );
  return rows[0] ?? null;
}

export async function updateLastLogin(userId: string): Promise<void> {
  await query('UPDATE users SET last_login = NOW() WHERE id = $1', [userId]);
}

export interface CreateUserInput {
  email: string;
  passwordHash: string;
  name: string;
  subscriptionId: string;
}

export async function createUser(input: CreateUserInput, executor?: Queryable): Promise<User> {
  const { rows } = await query<User>(
    `INSERT INTO users (email, password_hash, name, auth_provider, subscription_id)
     VALUES ($1, $2, $3, 'email', $4)
     RETURNING ${USER_COLUMNS}`,
    [input.email, input.passwordHash, input.name, input.subscriptionId],
    executor,
  );
  return rows[0];
}
