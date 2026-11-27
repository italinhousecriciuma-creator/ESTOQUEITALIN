import { neon } from '@neondatabase/serverless';

const TABLE_INIT = `
  CREATE TABLE IF NOT EXISTS app_data (
    key         TEXT PRIMARY KEY,
    value       JSONB NOT NULL,
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )
`;

// "Versão" de um registro = updated_at em microssegundos (texto).
// Usada para impedir que um aparelho salve por cima de alterações feitas por outro.
const VER = `(extract(epoch from updated_at) * 1000000)::bigint::text`;

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ error: 'DATABASE_URL not configured' });
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Garante que a tabela existe
    await sql(TABLE_INIT);

    // GET /api/db?key=xxx            → carrega um valor (formato antigo: só o valor)
    // GET /api/db?key=xxx&meta=1     → { value, version }
    // GET /api/db?key=xxx&meta=1&ifnot=VER → { version, unchanged:true } se não mudou (economiza dados)
    if (req.method === 'GET') {
      const { key, meta, ifnot } = req.query;
      if (!key) return res.status(400).json({ error: 'key required' });

      if (meta) {
        if (ifnot) {
          const vr = await sql(`SELECT ${VER} AS v FROM app_data WHERE key = $1`, [key]);
          const cur = vr[0]?.v ?? '0';
          if (cur === String(ifnot)) return res.status(200).json({ version: cur, unchanged: true });
        }
        const rows = await sql(`SELECT value, ${VER} AS v FROM app_data WHERE key = $1`, [key]);
        if (!rows[0]) return res.status(200).json({ value: null, version: '0' });
        return res.status(200).json({ value: rows[0].value, version: rows[0].v });
      }

      const rows = await sql('SELECT value FROM app_data WHERE key = $1', [key]);
      return res.status(200).json(rows[0]?.value ?? null);
    }

    // POST /api/db  → salva { key, value, expect? }
    // Com "expect" (versão que o aparelho conhece), só grava se ninguém mudou nada
    // desde então; senão responde 409 com o valor atual para o aparelho mesclar e tentar de novo.
    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
      const { key, value, expect } = body || {};
      if (!key || value === undefined) return res.status(400).json({ error: 'key and value required' });
      const json = JSON.stringify(value);

      if (expect !== undefined && expect !== null) {
        let rows;
        if (String(expect) === '0') {
          rows = await sql(
            `INSERT INTO app_data (key, value, updated_at)
             VALUES ($1, $2::jsonb, clock_timestamp())
             ON CONFLICT (key) DO NOTHING
             RETURNING ${VER} AS v`,
            [key, json]
          );
        } else {
          rows = await sql(
            `UPDATE app_data SET value = $2::jsonb, updated_at = clock_timestamp()
             WHERE key = $1 AND ${VER} = $3
             RETURNING ${VER} AS v`,
            [key, json, String(expect)]
          );
        }
        if (rows[0]) return res.status(200).json({ ok: true, version: rows[0].v });

        const cur = await sql(`SELECT value, ${VER} AS v FROM app_data WHERE key = $1`, [key]);
        return res.status(409).json({
          conflict: true,
          value: cur[0]?.value ?? null,
          version: cur[0]?.v ?? '0'
        });
      }

      // Sem "expect": comportamento antigo (grava direto)
      const rows = await sql(
        `INSERT INTO app_data (key, value, updated_at)
         VALUES ($1, $2::jsonb, clock_timestamp())
         ON CONFLICT (key) DO UPDATE
         SET value = EXCLUDED.value, updated_at = clock_timestamp()
         RETURNING ${VER} AS v`,
        [key, json]
      );
      return res.status(200).json({ ok: true, version: rows[0]?.v ?? null });
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
