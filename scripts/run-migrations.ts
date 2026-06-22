import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { Pool } from 'pg';

try {
  process.loadEnvFile();
} catch {
  // .env is optional
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function runMigrations() {
  const migrationsDir = join(__dirname, '../src/server/db/migrations');
  const files = readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const sql = readFileSync(join(migrationsDir, file), 'utf-8');
    try {
      console.log(`Running migration: ${file}`);
      await pool.query(sql);
      console.log(`✓ ${file}`);
    } catch (error) {
      console.error(`✗ ${file}:`, (error as Error).message);
      process.exit(1);
    }
  }

  console.log('\n✓ All migrations completed');
  await pool.end();
}

runMigrations();
