import { Pool, type PoolClient, type QueryResultRow } from 'pg';

try {
  process.loadEnvFile();
} catch {
  // .env is optional (e.g. when env vars are provided by the host)
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export type Queryable = Pick<Pool | PoolClient, 'query'>;

export function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
  executor: Queryable = pool,
) {
  return executor.query<T>(text, params);
}

export async function transaction<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
