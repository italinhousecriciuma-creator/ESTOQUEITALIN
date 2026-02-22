import { neon } from '@neondatabase/serverless';

const TABLE_INIT = `
  CREATE TABLE IF NOT EXISTS app_data (
    key         TEXT PRIMARY KEY,
    value       JSONB NOT NULL,
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )
`;

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ error: 'DATABASE_URL not configured' });
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Garante que a tabela existe
    await sql(TABLE_INIT);

    // GET /api/db?key=xxx  → carrega um valor
    if (req.method === 'GET') {
      const { key } = req.query;
      if (!key) return res.status(400).json({ error: 'key required' });

      const rows = await sql('SELECT value FROM app_data WHERE key = $1', [key]);
      return res.status(200).json(rows[0]?.value ?? null);
    }

    // POST /api/db  → salva { key, value }
    if (req.method === 'POST') {
      const { key, value } = req.body;
      if (!key || value === undefined) return res.status(400).json({ error: 'key and value required' });

      await sql(
        `INSERT INTO app_data (key, value, updated_at)
         VALUES ($1, $2::jsonb, NOW())
         ON CONFLICT (key) DO UPDATE
         SET value = EXCLUDED.value, updated_at = NOW()`,
        [key, JSON.stringify(value)]
      );
      return res.status(200).json({ ok: true });
    }

    // DELETE /api/db  → limpa todos os dados do app
    if (req.method === 'DELETE') {
      await sql("DELETE FROM app_data WHERE key LIKE 'italin:%'");
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (err) {
    console.error('DB error:', err);
    return res.status(500).json({ error: err.message });
  }
}
