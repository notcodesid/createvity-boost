import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";

export async function GET() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ user: null, accessToken: null });
  }

  const user = await verifySession(token);
  if (!user) {
    return NextResponse.json({ user: null, accessToken: null });
  }

  // Client needs the JWT to call the Hono API on another origin/port
  return NextResponse.json({
    user: {
      id: user.sub,
      email: user.email,
      name: user.name,
      picture: user.picture,
    },
    accessToken: token,
  });
}
