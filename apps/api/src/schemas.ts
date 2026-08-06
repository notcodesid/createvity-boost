import { z } from "zod";
import { IDEA_STATUSES, SESSION_TYPES } from "@createvity/shared";

export const createIdeaSchema = z.object({
  title: z.string().trim().min(1).max(500),
  body: z.string().max(50_000).optional().default(""),
  tags: z.array(z.string().trim().min(1).max(64)).max(20).optional().default([]),
  status: z.enum(IDEA_STATUSES).optional().default("raw"),
});

export const updateIdeaSchema = z
  .object({
    title: z.string().trim().min(1).max(500).optional(),
    body: z.string().max(50_000).optional(),
    tags: z.array(z.string().trim().min(1).max(64)).max(20).optional(),
    status: z.enum(IDEA_STATUSES).optional(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: "At least one field required" });

export const createSessionSchema = z.object({
  type: z.enum(SESSION_TYPES),
  ideaId: z.string().uuid().optional(),
  notes: z.string().max(50_000).optional(),
  meta: z.record(z.unknown()).optional(),
});

export const updateSessionSchema = z
  .object({
    notes: z.string().max(50_000).optional(),
    endedAt: z.number().int().positive().optional(),
    meta: z.record(z.unknown()).optional(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: "At least one field required" });

export const updateProfileSchema = z
  .object({
    successDefinition: z.string().max(2000).optional(),
    tenYearDream: z.string().max(5000).optional(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: "At least one field required" });

export const listIdeasQuerySchema = z.object({
  status: z.enum(IDEA_STATUSES).optional(),
  q: z.string().max(200).optional(),
  limit: z.coerce.number().int().min(1).max(200).optional().default(50),
  offset: z.coerce.number().int().min(0).optional().default(0),
});
