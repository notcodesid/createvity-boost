import { Hono } from "hono";
import { getUser, type AppVariables } from "../middleware.js";
import { mapUser } from "../mappers.js";

export const usersRouter = new Hono<{ Variables: AppVariables }>();

/** Current signed-in user (already upserted by auth middleware). */
usersRouter.get("/me", (c) => {
  return c.json({ user: mapUser(getUser(c)) });
});
