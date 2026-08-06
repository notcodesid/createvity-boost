import { Hono } from "hono";
import { execute, queryOne, type ProfileRow } from "../db.js";
import { mapProfile } from "../mappers.js";
import { getClientId, type AppVariables } from "../middleware.js";
import { updateProfileSchema } from "../schemas.js";

export const profileRouter = new Hono<{ Variables: AppVariables }>();

profileRouter.get("/", async (c) => {
  const clientId = getClientId(c);
  const row = await queryOne<ProfileRow>(
    `SELECT * FROM profiles WHERE client_id = $1`,
    [clientId],
  );

  if (!row) {
    return c.json({
      profile: {
        clientId,
        successDefinition: null,
        tenYearDream: null,
        updatedAt: Date.now(),
      },
    });
  }

  return c.json({ profile: mapProfile(row) });
});

profileRouter.put("/", async (c) => {
  const clientId = getClientId(c);
  const body = await c.req.json().catch(() => null);
  const parsed = updateProfileSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Invalid body", details: parsed.error.flatten() }, 400);
  }

  const existing = await queryOne<ProfileRow>(
    `SELECT * FROM profiles WHERE client_id = $1`,
    [clientId],
  );

  const now = Date.now();
  const successDefinition =
    parsed.data.successDefinition ?? existing?.success_definition ?? null;
  const tenYearDream = parsed.data.tenYearDream ?? existing?.ten_year_dream ?? null;

  await execute(
    `INSERT INTO profiles (client_id, success_definition, ten_year_dream, updated_at)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (client_id) DO UPDATE SET
       success_definition = EXCLUDED.success_definition,
       ten_year_dream = EXCLUDED.ten_year_dream,
       updated_at = EXCLUDED.updated_at`,
    [clientId, successDefinition, tenYearDream, now],
  );

  const row = await queryOne<ProfileRow>(
    `SELECT * FROM profiles WHERE client_id = $1`,
    [clientId],
  );

  return c.json({ profile: mapProfile(row!) });
});
