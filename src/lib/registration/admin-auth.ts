import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "anf-admin-session";

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === "production" ? "" : "annt-admin");
}

export function adminToken(password = adminPassword()): string {
  if (!password) return "";
  return createHmac("sha256", password).update("anf-admin-session").digest("hex");
}

export function isValidAdminPassword(value: string): boolean {
  const expected = adminPassword();
  if (!expected || !value) return false;
  const left = Buffer.from(adminToken(value));
  const right = Buffer.from(adminToken(expected));
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export async function isAdminRequest(): Promise<boolean> {
  const expected = adminToken();
  if (!expected) return false;
  const jar = await cookies();
  const got = jar.get(COOKIE)?.value || "";
  if (!got) return false;
  const left = Buffer.from(got);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function adminCookieOptions() {
  return {
    name: COOKIE,
    value: adminToken(),
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}
