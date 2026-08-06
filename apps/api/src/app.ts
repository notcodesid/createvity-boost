import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { getClientId, getUser, requireClientId, type AppVariables } from "./middleware.js";
import { mapUser } from "./mappers.js";
import { ideasRouter } from "./routes/ideas.js";
import { sessionsRouter } from "./routes/sessions.js";
import { profileRouter } from "./routes/profile.js";
import { usersRouter } from "./routes/users.js";

export function createApp() {
  const app = new Hono<{ Variables: AppVariables }>();

  const origin = process.env.CORS_ORIGIN ?? "*";
  app.use(
    "*",
    cors({
      origin: origin === "*" ? "*" : origin.split(",").map((s) => s.trim()),
      allowHeaders: ["Content-Type", "Authorization", "X-Client-Id"],
      allowMethods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    }),
  );
  app.use("*", logger());

  app.get("/health", (c) =>
    c.json({
      ok: true,
      service: "createvity-api",
      time: new Date().toISOString(),
      db: process.env.DATABASE_URL ? "postgres" : "missing",
      auth: {
        provider: "google",
        secretConfigured: Boolean(process.env.AUTH_SECRET),
      },
    }),
  );

  const api = new Hono<{ Variables: AppVariables }>();
  api.use("*", requireClientId);

  api.get("/me", (c) => {
    const user = getUser(c);
    return c.json({
      user: mapUser(user),
      userId: getClientId(c),
      email: user.email,
      auth: "google",
    });
  });

  api.route("/users", usersRouter);
  api.route("/ideas", ideasRouter);
  api.route("/sessions", sessionsRouter);
  api.route("/profile", profileRouter);

  app.route("/api", api);

  app.notFound((c) => c.json({ error: "Not found" }, 404));
  app.onError((err, c) => {
    console.error(err);
    return c.json({ error: "Internal server error", message: err.message }, 500);
  });

  return app;
}
