/** Shared domain types for Creativity Boost (web + api). */

export const IDEA_STATUSES = ["raw", "keep", "kill"] as const;
export type IdeaStatus = (typeof IDEA_STATUSES)[number];

export const SESSION_TYPES = ["diverge", "converge", "walk", "scamper"] as const;
export type SessionType = (typeof SESSION_TYPES)[number];

export interface Idea {
  id: string;
  clientId: string;
  title: string;
  body: string;
  status: IdeaStatus;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export interface Session {
  id: string;
  clientId: string;
  type: SessionType;
  ideaId?: string | null;
  notes?: string | null;
  startedAt: number;
  endedAt?: number | null;
  meta?: Record<string, unknown> | null;
}

export interface Profile {
  clientId: string;
  successDefinition?: string | null;
  tenYearDream?: string | null;
  updatedAt: number;
}

/** Signed-in app user (persisted in Postgres). */
export interface User {
  id: string;
  email: string;
  name?: string | null;
  picture?: string | null;
  provider: string;
  googleId?: string | null;
  createdAt: number;
  updatedAt: number;
  lastSeenAt: number;
}

export interface CreateIdeaInput {
  title: string;
  body?: string;
  tags?: string[];
  status?: IdeaStatus;
}

export interface UpdateIdeaInput {
  title?: string;
  body?: string;
  tags?: string[];
  status?: IdeaStatus;
}

export interface CreateSessionInput {
  type: SessionType;
  ideaId?: string;
  notes?: string;
  meta?: Record<string, unknown>;
}

export interface UpdateSessionInput {
  notes?: string;
  endedAt?: number;
  meta?: Record<string, unknown>;
}

export interface UpdateProfileInput {
  successDefinition?: string;
  tenYearDream?: string;
}
