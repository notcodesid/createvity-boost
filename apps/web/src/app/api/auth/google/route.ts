import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getGoogleAuthUrl } from "@/lib/session";
import { randomBytes } from "node:crypto";

export async function GET() {
  const state = randomBytes(16).toString("hex");
  const jar = await cookies();
  jar.set("oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 600,
  });

  const url = getGoogleAuthUrl(state);
  return NextResponse.redirect(url);
}
