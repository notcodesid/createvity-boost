const KEY = "createvity_client_id";

function randomId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID().replace(/-/g, "");
  }
  return `c_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

/** Stable browser identity for API X-Client-Id header. */
export function getClientId(): string {
  if (typeof window === "undefined") return "ssr";
  let id = localStorage.getItem(KEY);
  if (!id || id.length < 8) {
    id = randomId();
    localStorage.setItem(KEY, id);
  }
  return id;
}
