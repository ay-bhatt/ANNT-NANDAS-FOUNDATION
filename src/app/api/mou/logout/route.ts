import { NextResponse } from "next/server";
import { getMouCookieOptions, MOU_COOKIE_NAME } from "@/lib/mou-session";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(MOU_COOKIE_NAME, "", getMouCookieOptions(0));
  return response;
}
