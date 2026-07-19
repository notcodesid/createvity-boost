import { Hono } from "hono";
import { randomUUID } from "node:crypto";
import { execute, query, queryOne, type IdeaRow } from "../db.js";
import { mapIdea } from "../mappers.js";
import { getClientId, type AppVariables } from "../middleware.js";
import {
  createIdeaSchema,
  listIdeasQuerySchema,
  shipMetaSchema,
  updateIdeaSchema,
} from "../schemas.js";

export const ideasRouter = new Hono<{ Variables: AppVariables }>();

ideasRouter.get("/", async (c) => {
  const clientId = getClientId(c);
  const parsed = listIdeasQuerySchema.safeParse(c.req.query());
  if (!parsed.success) {
    return c.json({ error: "Invalid query", details: parsed.error.flatten() }, 400);
  }

  const { status, q, limit, offset } = parsed.data;
  const clauses: string[] = ["client_id = $1"];
  const params: unknown[] = [clientId];

  if (status) {
    params.push(status);
    clauses.push(`status = $${params.length}`);
  }
  if (q) {
    const like = `%${q}%`;
    params.push(like, like);
    const a = params.length - 1;
    const b = params.length;
    clauses.push(`(title ILIKE $${a} OR body ILIKE $${b})`);
  }

  const where = clauses.join(" AND ");
  params.push(limit, offset);
  const limitIdx = params.length - 1;
  const offsetIdx = params.length;

  const rows = await query<IdeaRow>(
    `SELECT * FROM ideas WHERE ${where} ORDER BY updated_at DESC LIMIT $${limitIdx} OFFSET $${offsetIdx}`,
    params,
  );

  const countParams = params.slice(0, params.length - 2);
  const totalRow = await queryOne<{ n: string }>(
    `SELECT COUNT(*)::text AS n FROM ideas WHERE ${where}`,
    countParams,
  );
  const total = Number(totalRow?.n ?? 0);

  return c.json({
    ideas: rows.map(mapIdea),
    total,
    limit,
    offset,
  });
});

ideasRouter.get("/:id", async (c) => {
  const clientId = getClientId(c);
  const row = await queryOne<IdeaRow>(
    `SELECT * FROM ideas WHERE id = $1 AND client_id = $2`,
    [c.req.param("id"), clientId],
  );

  if (!row) return c.json({ error: "Idea not found" }, 404);
  return c.json({ idea: mapIdea(row) });
});

ideasRouter.post("/", async (c) => {
  const clientId = getClientId(c);
  const body = await c.req.json().catch(() => null);
  const parsed = createIdeaSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Invalid body", details: parsed.error.flatten() }, 400);
  }

  const now = Date.now();
  const id = randomUUID();
  const { title, body: ideaBody, tags, status } = parsed.data;

  await execute(
    `INSERT INTO ideas (id, client_id, title, body, status, tags_json, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [id, clientId, title, ideaBody, status, JSON.stringify(tags), now, now],
  );

  const row = await queryOne<IdeaRow>(`SELECT * FROM ideas WHERE id = $1`, [id]);
  return c.json({ idea: mapIdea(row!) }, 201);
});

ideasRouter.patch("/:id", async (c) => {
  const clientId = getClientId(c);
  const id = c.req.param("id");
  const existing = await queryOne<IdeaRow>(
    `SELECT * FROM ideas WHERE id = $1 AND client_id = $2`,
    [id, clientId],
  );
  if (!existing) return c.json({ error: "Idea not found" }, 404);

  const body = await c.req.json().catch(() => null);
  const parsed = updateIdeaSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Invalid body", details: parsed.error.flatten() }, 400);
  }

  const next = {
    title: parsed.data.title ?? existing.title,
    body: parsed.data.body ?? existing.body,
    status: parsed.data.status ?? existing.status,
    tags_json:
      parsed.data.tags !== undefined
        ? JSON.stringify(parsed.data.tags)
        : existing.tags_json,
    updated_at: Date.now(),
  };

  await execute(
    `UPDATE ideas SET title = $1, body = $2, status = $3, tags_json = $4, updated_at = $5
     WHERE id = $6 AND client_id = $7`,
    [next.title, next.body, next.status, next.tags_json, next.updated_at, id, clientId],
  );

  const row = await queryOne<IdeaRow>(`SELECT * FROM ideas WHERE id = $1`, [id]);
  return c.json({ idea: mapIdea(row!) });
});

ideasRouter.delete("/:id", async (c) => {
  const clientId = getClientId(c);
  const changes = await execute(
    `DELETE FROM ideas WHERE id = $1 AND client_id = $2`,
    [c.req.param("id"), clientId],
  );

  if (changes === 0) return c.json({ error: "Idea not found" }, 404);
  return c.json({ ok: true });
});

/**
 * Attach ship result after the client successfully posts a public ship receipt.
 * Backend never holds private keys — wallet tx happens in the browser.
 */
ideasRouter.post("/:id/ship-meta", async (c) => {
  const clientId = getClientId(c);
  const id = c.req.param("id");
  const existing = await queryOne<IdeaRow>(
    `SELECT * FROM ideas WHERE id = $1 AND client_id = $2`,
    [id, clientId],
  );
  if (!existing) return c.json({ error: "Idea not found" }, 404);

  const body = await c.req.json().catch(() => null);
  const parsed = shipMetaSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Invalid body", details: parsed.error.flatten() }, 400);
  }

  const now = Date.now();
  const data = parsed.data;

  await execute(
    `UPDATE ideas SET
       status = 'shipped',
       ship_tx_hash = $1,
       ship_receipt_id = $2,
       ship_title = $3,
       ship_link = $4,
       content_hash = $5,
       wallet_address = $6,
       updated_at = $7
     WHERE id = $8 AND client_id = $9`,
    [
      data.shipTxHash,
      data.shipReceiptId,
      data.shipTitle,
      data.shipLink || null,
      data.contentHash,
      data.walletAddress.toLowerCase(),
      now,
      id,
      clientId,
    ],
  );

  const row = await queryOne<IdeaRow>(`SELECT * FROM ideas WHERE id = $1`, [id]);
  return c.json({ idea: mapIdea(row!) });
});
