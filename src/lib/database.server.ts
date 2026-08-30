import { Pool } from "pg";

let pool: Pool | undefined;

function getPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }

  pool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
    maxUses: 7500,
  });

  return pool;
}

export async function checkDatabaseConnection(): Promise<{ ok: true; latencyMs: number }> {
  const startedAt = performance.now();
  const client = await getPool().connect();

  try {
    await client.query("SELECT 1");
    return { ok: true, latencyMs: Math.round(performance.now() - startedAt) };
  } finally {
    client.release();
  }
}

export async function closeDatabasePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = undefined;
  }
}
