import { NextResponse } from "next/server";
import { adminCookieOptions, adminPassword, isValidAdminPassword } from "@/lib/registration/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!adminPassword()) {
    return NextResponse.json({ success: false, message: "Admin password is not configured." }, { status: 503 });
  }

  const body = (await request.json().catch(() => ({}))) as { password?: string };
  if (!isValidAdminPassword(String(body.password || ""))) {
    return NextResponse.json({ success: false, message: "Incorrect password." }, { status: 401 });
  }

  const cookie = adminCookieOptions();
  const response = NextResponse.json({ success: true });
  response.cookies.set(cookie);
  return response;
}
