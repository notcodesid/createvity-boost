/** Bridge so the API client can send the Google session JWT. */

type TokenGetter = () => Promise<string | null | undefined>;

let getter: TokenGetter | null = null;
let cached: string | null = null;

export function setAccessTokenGetter(fn: TokenGetter | null) {
  getter = fn;
}

export function setCachedAccessToken(token: string | null) {
  cached = token;
}

export async function getAccessToken(): Promise<string | null> {
  if (cached) return cached;
  if (!getter) return null;
  try {
    const t = await getter();
    cached = t ?? null;
    return cached;
  } catch {
    return null;
  }
}
