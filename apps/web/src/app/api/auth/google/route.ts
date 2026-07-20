import { NextRequest, NextResponse } from "next/server";
import { getGoogleAuthUrl } from "@/lib/session";
import { randomBytes } from "node:crypto";

export async function GET(req: NextRequest) {
  try {
    const state = randomBytes(16).toString("hex");
    const url = getGoogleAuthUrl(state, req);

    const res = NextResponse.redirect(url);
    res.cookies.set("oauth_state", state, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 600,
    });
    return res;
  } catch (err) {
    const message = err instanceof Error ? err.message : "auth_init_failed";
    console.error("[auth/google]", message);
    return NextResponse.json(
      {
        error: "Google OAuth is not configured",
        detail: message,
        hint: "Set GOOGLE_CLIENT_ID (and GOOGLE_CLIENT_SECRET, AUTH_SECRET, AUTH_URL) in the Vercel project environment variables, then redeploy. Also add the production redirect URI in Google Cloud Console.",
      },
      { status: 500 },
    );
  }
}
