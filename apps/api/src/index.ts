import { config as loadEnv } from "dotenv";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { serve } from "@hono/node-server";
import { createApp } from "./app.js";
import { migrate } from "./db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadEnv({ path: resolve(__dirname, "../.env") });
loadEnv({ path: resolve(__dirname, "../../../.env") });

const port = Number(process.env.PORT ?? 8787);
const app = createApp();

async function main() {
  await migrate();
  console.log(`createvity-api db: postgres (supabase)`);
  console.log(`createvity-api listening on http://localhost:${port}`);
  console.log(`health: http://localhost:${port}/health`);
  console.log(`auth: Google OAuth session JWT`);

  serve({
    fetch: app.fetch,
    port,
  });
}

main().catch((err) => {
  console.error("Failed to start API:", err);
  process.exit(1);
});
