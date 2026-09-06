import { NextResponse } from "next/server";
import { verifyMouPassword } from "@/lib/mou-password";
import { checkMouLoginRateLimit, getClientIp, resetMouLoginRateLimit } from "@/lib/mou-rate-limit";
import { createMouSessionToken, getMouCookieOptions, MOU_COOKIE_NAME } from "@/lib/mou-session";

const GENERIC_ERROR = "Access denied. Please try again.";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkMouLoginRateLimit(ip);

  if (!rate.allowed) {
    return NextResponse.json({ success: false, message: GENERIC_ERROR }, { status: 429 });
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ success: false, message: GENERIC_ERROR }, { status: 400 });
  }

  if (!password || password.length > 200) {
    return NextResponse.json({ success: false, message: GENERIC_ERROR }, { status: 400 });
  }

  const valid = verifyMouPassword(password);
  if (!valid) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return NextResponse.json({ success: false, message: GENERIC_ERROR }, { status: 401 });
  }

  try {
    const token = await createMouSessionToken();
    resetMouLoginRateLimit(ip);

    const response = NextResponse.json({ success: true });
    response.cookies.set(MOU_COOKIE_NAME, token, getMouCookieOptions());
    return response;
  } catch (error) {
    console.error("[mou/login] session creation failed", error);
    return NextResponse.json({ success: false, message: GENERIC_ERROR }, { status: 500 });
  }
}
