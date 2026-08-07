import pg from "pg";

const { Pool } = pg;

let _pool: pg.Pool | null = null;

function resolveConnectionString(): string {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    throw new Error(
      "DATABASE_URL is required (Supabase Postgres connection string)",
    );
  }
  return url;
}

export function getPool(): pg.Pool {
  if (!_pool) {
    _pool = new Pool({
      connectionString: resolveConnectionString(),
      ssl: { rejectUnauthorized: false },
      max: 10,
    });
  }
  return _pool;
}

export async function query<T extends pg.QueryResultRow = pg.QueryResultRow>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  const result = await getPool().query<T>(text, params);
  return result.rows;
}

export async function queryOne<T extends pg.QueryResultRow = pg.QueryResultRow>(
  text: string,
  params: unknown[] = [],
): Promise<T | undefined> {
  const rows = await query<T>(text, params);
  return rows[0];
}

export async function execute(
  text: string,
  params: unknown[] = [],
): Promise<number> {
  const result = await getPool().query(text, params);
  return result.rowCount ?? 0;
}

export async function migrate() {
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      name TEXT,
      picture TEXT,
      provider TEXT NOT NULL DEFAULT 'google',
      google_id TEXT,
      created_at BIGINT NOT NULL,
      updated_at BIGINT NOT NULL,
      last_seen_at BIGINT NOT NULL
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_users_google ON users(google_id);

    CREATE TABLE IF NOT EXISTS ideas (
      id TEXT PRIMARY KEY,
      client_id TEXT NOT NULL,
      title TEXT NOT NULL,
      body TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'raw',
      tags_json TEXT NOT NULL DEFAULT '[]',
      next_action TEXT,
      next_action_updated_at BIGINT,
      created_at BIGINT NOT NULL,
      updated_at BIGINT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_ideas_client ON ideas(client_id);
    CREATE INDEX IF NOT EXISTS idx_ideas_status ON ideas(client_id, status);
    CREATE INDEX IF NOT EXISTS idx_ideas_updated ON ideas(client_id, updated_at DESC);

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      client_id TEXT NOT NULL,
      type TEXT NOT NULL,
      idea_id TEXT REFERENCES ideas(id) ON DELETE SET NULL,
      notes TEXT,
      started_at BIGINT NOT NULL,
      ended_at BIGINT,
      meta_json TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_sessions_client ON sessions(client_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_started ON sessions(client_id, started_at DESC);

    CREATE TABLE IF NOT EXISTS profiles (
      client_id TEXT PRIMARY KEY,
      success_definition TEXT,
      ten_year_dream TEXT,
      updated_at BIGINT NOT NULL
    );

    ALTER TABLE ideas ADD COLUMN IF NOT EXISTS next_action TEXT;
    ALTER TABLE ideas ADD COLUMN IF NOT EXISTS next_action_updated_at BIGINT;
  `);
}

export type UserRow = {
  id: string;
  email: string;
  name: string | null;
  picture: string | null;
  provider: string;
  google_id: string | null;
  created_at: string | number;
  updated_at: string | number;
  last_seen_at: string | number;
};

export type UpsertUserInput = {
  id: string;
  email: string;
  name?: string | null;
  picture?: string | null;
};

/** Create or update the signed-in user (Google OAuth). */
export async function upsertUser(input: UpsertUserInput): Promise<UserRow> {
  const now = Date.now();
  const googleId = input.id.startsWith("google:")
    ? input.id.slice("google:".length)
    : null;

  const row = await queryOne<UserRow>(
    `INSERT INTO users (id, email, name, picture, provider, google_id, created_at, updated_at, last_seen_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $7, $7)
     ON CONFLICT (id) DO UPDATE SET
       email = EXCLUDED.email,
       name = COALESCE(EXCLUDED.name, users.name),
       picture = COALESCE(EXCLUDED.picture, users.picture),
       google_id = COALESCE(EXCLUDED.google_id, users.google_id),
       updated_at = EXCLUDED.updated_at,
       last_seen_at = EXCLUDED.last_seen_at
     RETURNING *`,
    [
      input.id,
      input.email.toLowerCase(),
      input.name ?? null,
      input.picture ?? null,
      "google",
      googleId,
      now,
    ],
  );

  if (!row) {
    throw new Error("Failed to upsert user");
  }
  return row;
}

export async function getUserById(id: string): Promise<UserRow | undefined> {
  return queryOne<UserRow>(`SELECT * FROM users WHERE id = $1`, [id]);
}

export type IdeaRow = {
  id: string;
  client_id: string;
  title: string;
  body: string;
  status: string;
  tags_json: string;
  next_action: string | null;
  next_action_updated_at: string | number | null;
  created_at: string | number;
  updated_at: string | number;
};

export type SessionRow = {
  id: string;
  client_id: string;
  type: string;
  idea_id: string | null;
  notes: string | null;
  started_at: string | number;
  ended_at: string | number | null;
  meta_json: string | null;
};

export type ProfileRow = {
  client_id: string;
  success_definition: string | null;
  ten_year_dream: string | null;
  updated_at: string | number;
};
