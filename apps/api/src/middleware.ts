import type { Context } from "hono";
import { createMiddleware } from "hono/factory";
import { jwtVerify } from "jose";
import { upsertUser, type UserRow } from "./db.js";

export type AppVariables = {
  clientId: string;
  email?: string | null;
  name?: string | null;
  picture?: string | null;
  user?: UserRow;
};

function getAuthSecret(): Uint8Array | null {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

/**
 * Require Google session JWT (Authorization: Bearer …).
 * Subject is `google:<googleUserId>` — vault owner key.
 * Upserts the user row in Postgres on every authenticated request.
 */
export const requireClientId = createMiddleware<{ Variables: AppVariables }>(
  async (c, next) => {
    const auth = c.req.header("authorization") ?? c.req.header("Authorization");
    const bearer = auth?.match(/^Bearer\s+(.+)$/i)?.[1]?.trim();

    if (!bearer) {
      return c.json(
        {
          error: "Unauthorized",
          hint: "Sign in with Google, then retry",
        },
        401,
      );
    }

    const secret = getAuthSecret();
    if (!secret) {
      return c.json(
        {
          error: "Server missing AUTH_SECRET",
          hint: "Set AUTH_SECRET in apps/api/.env (same value as web)",
        },
        503,
      );
    }

    try {
      const { payload } = await jwtVerify(bearer, secret);
      if (!payload.sub) {
        return c.json({ error: "Invalid session" }, 401);
      }

      const email =
        typeof payload.email === "string" ? payload.email : null;
      const name = typeof payload.name === "string" ? payload.name : null;
      const picture =
        typeof payload.picture === "string" ? payload.picture : null;

      if (!email) {
        return c.json({ error: "Session missing email" }, 401);
      }

      c.set("clientId", payload.sub);
      c.set("email", email);
      c.set("name", name);
      c.set("picture", picture);

      // Persist / refresh user in Supabase
      const user = await upsertUser({
        id: payload.sub,
        email,
        name,
        picture,
      });
      c.set("user", user);

      await next();
    } catch (err) {
      console.error("JWT verify / user upsert failed:", err);
      return c.json(
        {
          error: "Invalid or expired session",
          hint: "Sign in with Google again",
        },
        401,
      );
    }
  },
);

export function getClientId(c: Context<{ Variables: AppVariables }>): string {
  return c.get("clientId");
}

export function getUser(c: Context<{ Variables: AppVariables }>): UserRow {
  const user = c.get("user");
  if (!user) throw new Error("User not loaded");
  return user;
}
