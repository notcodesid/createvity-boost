import type { Idea, Profile, Session, User } from "@createvity/shared";
import type { IdeaRow, ProfileRow, SessionRow, UserRow } from "./db.js";

function num(v: string | number | null | undefined): number {
  if (v == null) return 0;
  return typeof v === "number" ? v : Number(v);
}

export function mapUser(row: UserRow): User {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    picture: row.picture,
    provider: row.provider,
    googleId: row.google_id,
    createdAt: num(row.created_at),
    updatedAt: num(row.updated_at),
    lastSeenAt: num(row.last_seen_at),
  };
}

export function mapIdea(row: IdeaRow): Idea {
  let tags: string[] = [];
  try {
    tags = JSON.parse(row.tags_json) as string[];
    if (!Array.isArray(tags)) tags = [];
  } catch {
    tags = [];
  }

  return {
    id: row.id,
    clientId: row.client_id,
    title: row.title,
    body: row.body,
    status: row.status as Idea["status"],
    tags,
    createdAt: num(row.created_at),
    updatedAt: num(row.updated_at),
    shipTxHash: row.ship_tx_hash,
    shipReceiptId: row.ship_receipt_id,
    shipLink: row.ship_link,
    shipTitle: row.ship_title,
    contentHash: row.content_hash,
    walletAddress: row.wallet_address,
  };
}

export function mapSession(row: SessionRow): Session {
  let meta: Record<string, unknown> | null = null;
  if (row.meta_json) {
    try {
      meta = JSON.parse(row.meta_json) as Record<string, unknown>;
    } catch {
      meta = null;
    }
  }

  return {
    id: row.id,
    clientId: row.client_id,
    type: row.type as Session["type"],
    ideaId: row.idea_id,
    notes: row.notes,
    startedAt: num(row.started_at),
    endedAt: row.ended_at == null ? null : num(row.ended_at),
    meta,
  };
}

export function mapProfile(row: ProfileRow): Profile {
  return {
    clientId: row.client_id,
    successDefinition: row.success_definition,
    tenYearDream: row.ten_year_dream,
    walletAddress: row.wallet_address,
    updatedAt: num(row.updated_at),
  };
}
