import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  getAuthBaseUrl,
  getGoogleClientId,
  getGoogleRedirectUri,
  signSession,
} from "@/lib/session";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const err = url.searchParams.get("error");
  const base = getAuthBaseUrl(req);

  if (err) {
    return NextResponse.redirect(
      `${base}/?authError=${encodeURIComponent(err)}`,
    );
  }

  const jar = await cookies();
  const expectedState = jar.get("oauth_state")?.value;
  jar.delete("oauth_state");

  if (!code || !state || !expectedState || state !== expectedState) {
    return NextResponse.redirect(`${base}/?authError=invalid_state`);
  }

  let clientId: string;
  try {
    clientId = getGoogleClientId();
  } catch {
    return NextResponse.redirect(`${base}/?authError=missing_google_env`);
  }

  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientSecret) {
    return NextResponse.redirect(`${base}/?authError=missing_google_env`);
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: getGoogleRedirectUri(req),
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    const body = await tokenRes.text();
    console.error("Google token exchange failed:", body);
    return NextResponse.redirect(`${base}/?authError=token_exchange`);
  }

  const tokens = (await tokenRes.json()) as { access_token?: string };
  if (!tokens.access_token) {
    return NextResponse.redirect(`${base}/?authError=no_access_token`);
  }

  const profileRes = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    },
  );

  if (!profileRes.ok) {
    return NextResponse.redirect(`${base}/?authError=profile`);
  }

  const profile = (await profileRes.json()) as {
    id: string;
    email: string;
    name?: string;
    picture?: string;
  };

  if (!profile.id || !profile.email) {
    return NextResponse.redirect(`${base}/?authError=incomplete_profile`);
  }

  let sessionToken: string;
  try {
    sessionToken = await signSession({
      sub: `google:${profile.id}`,
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
    });
  } catch (e) {
    console.error("[auth/callback] signSession failed:", e);
    return NextResponse.redirect(`${base}/?authError=missing_auth_secret`);
  }

  const res = NextResponse.redirect(`${base}/`);
  res.cookies.set(SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
