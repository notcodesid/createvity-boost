import { Hono } from "hono";
import { randomUUID } from "node:crypto";
import { execute, query, queryOne, type SessionRow } from "../db.js";
import { mapSession } from "../mappers.js";
import { getClientId, type AppVariables } from "../middleware.js";
import { createSessionSchema, updateSessionSchema } from "../schemas.js";

export const sessionsRouter = new Hono<{ Variables: AppVariables }>();

sessionsRouter.get("/", async (c) => {
  const clientId = getClientId(c);
  const limit = Math.min(Number(c.req.query("limit") ?? 50), 200);
  const offset = Math.max(Number(c.req.query("offset") ?? 0), 0);

  const rows = await query<SessionRow>(
    `SELECT * FROM sessions WHERE client_id = $1 ORDER BY started_at DESC LIMIT $2 OFFSET $3`,
    [clientId, limit, offset],
  );

  return c.json({ sessions: rows.map(mapSession) });
});

sessionsRouter.post("/", async (c) => {
  const clientId = getClientId(c);
  const body = await c.req.json().catch(() => null);
  const parsed = createSessionSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Invalid body", details: parsed.error.flatten() }, 400);
  }

  if (parsed.data.ideaId) {
    const idea = await queryOne(
      `SELECT id FROM ideas WHERE id = $1 AND client_id = $2`,
      [parsed.data.ideaId, clientId],
    );
    if (!idea) return c.json({ error: "ideaId not found for this client" }, 400);
  }

  const id = randomUUID();
  const now = Date.now();
  const metaJson = parsed.data.meta ? JSON.stringify(parsed.data.meta) : null;

  await execute(
    `INSERT INTO sessions (id, client_id, type, idea_id, notes, started_at, ended_at, meta_json)
     VALUES ($1, $2, $3, $4, $5, $6, NULL, $7)`,
    [
      id,
      clientId,
      parsed.data.type,
      parsed.data.ideaId ?? null,
      parsed.data.notes ?? null,
      now,
      metaJson,
    ],
  );

  const row = await queryOne<SessionRow>(`SELECT * FROM sessions WHERE id = $1`, [id]);
  return c.json({ session: mapSession(row!) }, 201);
});

sessionsRouter.patch("/:id", async (c) => {
  const clientId = getClientId(c);
  const id = c.req.param("id");
  const existing = await queryOne<SessionRow>(
    `SELECT * FROM sessions WHERE id = $1 AND client_id = $2`,
    [id, clientId],
  );
  if (!existing) return c.json({ error: "Session not found" }, 404);

  const body = await c.req.json().catch(() => null);
  const parsed = updateSessionSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Invalid body", details: parsed.error.flatten() }, 400);
  }

  const notes = parsed.data.notes ?? existing.notes;
  const endedAt = parsed.data.endedAt ?? existing.ended_at;
  const metaJson =
    parsed.data.meta !== undefined
      ? JSON.stringify(parsed.data.meta)
      : existing.meta_json;

  await execute(
    `UPDATE sessions SET notes = $1, ended_at = $2, meta_json = $3 WHERE id = $4 AND client_id = $5`,
    [notes, endedAt, metaJson, id, clientId],
  );

  const row = await queryOne<SessionRow>(`SELECT * FROM sessions WHERE id = $1`, [id]);
  return c.json({ session: mapSession(row!) });
});
