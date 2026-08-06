import type {
  CreateIdeaInput,
  CreateSessionInput,
  Idea,
  Profile,
  Session,
  UpdateIdeaInput,
  UpdateProfileInput,
  UpdateSessionInput,
  User,
} from "@createvity/shared";
import { getAccessToken } from "./auth-token";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8787";

async function request<T>(
  path: string,
  init: RequestInit = {},
  auth = true,
): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  if (auth) {
    const token = await getAccessToken();
    if (!token) {
      throw new Error("Not signed in — sign in with Google first");
    }
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_URL}${path}`, { ...init, headers });
  const data = (await res.json().catch(() => ({}))) as T & {
    error?: string;
    details?: unknown;
  };

  if (!res.ok) {
    const msg =
      typeof data?.error === "string"
        ? data.error
        : `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
}

export const api = {
  health: () => request<{ ok: boolean }>("/health", {}, false),

  listIdeas: (params?: { status?: string; q?: string }) => {
    const sp = new URLSearchParams();
    if (params?.status) sp.set("status", params.status);
    if (params?.q) sp.set("q", params.q);
    const qs = sp.toString();
    return request<{ ideas: Idea[]; total: number }>(
      `/api/ideas${qs ? `?${qs}` : ""}`,
    );
  },

  createIdea: (body: CreateIdeaInput) =>
    request<{ idea: Idea }>("/api/ideas", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateIdea: (id: string, body: UpdateIdeaInput) =>
    request<{ idea: Idea }>(`/api/ideas/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  deleteIdea: (id: string) =>
    request<{ ok: boolean }>(`/api/ideas/${id}`, { method: "DELETE" }),

  listSessions: () => request<{ sessions: Session[] }>("/api/sessions"),

  createSession: (body: CreateSessionInput) =>
    request<{ session: Session }>("/api/sessions", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateSession: (id: string, body: UpdateSessionInput) =>
    request<{ session: Session }>(`/api/sessions/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  getProfile: () => request<{ profile: Profile }>("/api/profile"),

  updateProfile: (body: UpdateProfileInput) =>
    request<{ profile: Profile }>("/api/profile", {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  me: () =>
    request<{ user: User; userId: string; email: string; auth: string }>(
      "/api/me",
    ),

  getUser: () => request<{ user: User }>("/api/users/me"),
};
