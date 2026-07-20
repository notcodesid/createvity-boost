import { SignJWT, jwtVerify } from "jose";

export type SessionUser = {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
};

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export async function signSession(user: SessionUser): Promise<string> {
  return new SignJWT({
    email: user.email,
    name: user.name,
    picture: user.picture,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifySession(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (!payload.sub || typeof payload.email !== "string") return null;
    return {
      sub: payload.sub,
      email: payload.email,
      name: typeof payload.name === "string" ? payload.name : undefined,
      picture: typeof payload.picture === "string" ? payload.picture : undefined,
    };
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = "createvity_session";

/**
 * Public origin of the web app (no trailing slash).
 * Prefer AUTH_URL / NEXTAUTH_URL; on Vercel fall back to VERCEL_URL / request host.
 */
export function getAuthBaseUrl(req?: Request): string {
  const explicit =
    process.env.AUTH_URL ??
    process.env.NEXTAUTH_URL ??
    process.env.NEXT_PUBLIC_APP_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  if (process.env.VERCEL_URL) {
    const host = process.env.VERCEL_URL.replace(/\/$/, "");
    return host.startsWith("http") ? host : `https://${host}`;
  }

  if (req) {
    const host =
      req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    const proto =
      req.headers.get("x-forwarded-proto") ??
      (host?.includes("localhost") ? "http" : "https");
    if (host) return `${proto}://${host}`.replace(/\/$/, "");
  }

  return "http://localhost:3000";
}

export function getGoogleRedirectUri(req?: Request): string {
  return `${getAuthBaseUrl(req)}/api/auth/callback/google`;
}

export function getGoogleClientId(): string {
  const clientId =
    process.env.GOOGLE_CLIENT_ID ?? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error(
      "GOOGLE_CLIENT_ID is not set (also checked NEXT_PUBLIC_GOOGLE_CLIENT_ID)",
    );
  }
  return clientId;
}

export function getGoogleAuthUrl(state: string, req?: Request): string {
  const clientId = getGoogleClientId();

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: getGoogleRedirectUri(req),
    response_type: "code",
    scope: "openid email profile",
    access_type: "online",
    include_granted_scopes: "true",
    state,
    prompt: "select_account",
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}
