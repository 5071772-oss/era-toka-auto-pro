import { Pool } from "pg";
import { CARS } from "../src/lib/catalog-data";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1,
  connectionTimeoutMillis: 10_000,
});

function parsePrice(price: string): number | null {
  const match = price.replace(/\s/g, "").match(/([\d.]+)/);
  return match ? Number(match[1].replace(/\./g, "")) : null;
}

function extractVideoUrl(specs: string): string | null {
  return specs.match(/https?:\/\/(?:www\.)?youtu\.be\/[\w-]+(?:\?[^\s]+)?|https?:\/\/www\.youtube\.com\/watch\?[^\s]+/)?.[0] ?? null;
}

async function migrate() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(`
      CREATE TABLE IF NOT EXISTS catalog (
        id BIGSERIAL PRIMARY KEY,
        brand TEXT NOT NULL,
        title TEXT NOT NULL,
        price_text TEXT NOT NULL DEFAULT '',
        price_yuan INTEGER,
        description TEXT,
        specs TEXT NOT NULL DEFAULT '',
        image_url TEXT,
        image_urls JSONB NOT NULL DEFAULT '[]'::jsonb,
        video_url TEXT,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (brand, title)
      )
    `);

    for (const car of CARS) {
      const images = car.images?.length ? car.images : [car.img];
      await client.query(
        `INSERT INTO catalog
          (brand, title, price_text, price_yuan, specs, image_url, image_urls, video_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8)
         ON CONFLICT (brand, title) DO UPDATE SET
           price_text = EXCLUDED.price_text,
           price_yuan = EXCLUDED.price_yuan,
           specs = EXCLUDED.specs,
           image_url = EXCLUDED.image_url,
           image_urls = EXCLUDED.image_urls,
           video_url = EXCLUDED.video_url,
           updated_at = NOW()`,
        [
          car.brand,
          car.title,
          car.price,
          parsePrice(car.price),
          car.specs,
          car.img,
          JSON.stringify(images),
          extractVideoUrl(car.specs),
        ],
      );
    }

    const result = await client.query<{ count: string }>("SELECT COUNT(*)::text AS count FROM catalog");
    await client.query("COMMIT");
    console.log(`[catalog] migrated ${result.rows[0]?.count ?? 0} vehicles`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch((error) => {
  console.error("[catalog] migration failed", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

export {};
