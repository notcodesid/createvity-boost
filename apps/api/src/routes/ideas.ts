import { Hono } from "hono";
import { randomUUID } from "node:crypto";
import { execute, query, queryOne, type IdeaRow } from "../db.js";
import { mapIdea } from "../mappers.js";
import { getClientId, type AppVariables } from "../middleware.js";
import {
  createIdeaSchema,
  listIdeasQuerySchema,
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
  const { title, body: ideaBody, tags, status, nextAction } = parsed.data;

  await execute(
    `INSERT INTO ideas (id, client_id, title, body, status, tags_json, next_action, next_action_updated_at, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [
      id,
      clientId,
      title,
      ideaBody,
      status,
      JSON.stringify(tags),
      nextAction ?? null,
      nextAction ? now : null,
      now,
      now,
    ],
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
    next_action:
      parsed.data.nextAction !== undefined
        ? parsed.data.nextAction
        : existing.next_action,
    next_action_updated_at:
      parsed.data.nextAction !== undefined
        ? parsed.data.nextAction
          ? Date.now()
          : null
        : existing.next_action_updated_at,
    updated_at: Date.now(),
  };

  await execute(
    `UPDATE ideas
     SET title = $1, body = $2, status = $3, tags_json = $4, next_action = $5,
       next_action_updated_at = $6, updated_at = $7
     WHERE id = $8 AND client_id = $9`,
    [
      next.title,
      next.body,
      next.status,
      next.tags_json,
      next.next_action,
      next.next_action_updated_at,
      next.updated_at,
      id,
      clientId,
    ],
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
