import { Pool, type QueryResultRow } from 'pg';

try {
  process.loadEnvFile();
} catch {
  // .env is optional (e.g. when env vars are provided by the host)
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
) {
  return pool.query<T>(text, params);
}
