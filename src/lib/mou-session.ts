const encoder = new TextEncoder();

export const MOU_COOKIE_NAME = "mou_session";
export const MOU_MAX_AGE_SECONDS = 60 * 60 * 8;

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (const byte of view) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export function getMouSessionSecret(): string {
  return process.env.MOU_SESSION_SECRET || process.env.MOU_ADMIN_PASSWORD || "";
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return toBase64Url(signature);
}

export async function createMouSessionToken(): Promise<string> {
  const secret = getMouSessionSecret();
  if (!secret) {
    throw new Error("MOU session secret is not configured.");
  }

  const nonceBytes = new Uint8Array(16);
  crypto.getRandomValues(nonceBytes);
  const nonce = toBase64Url(nonceBytes);
  const expiresAt = Date.now() + MOU_MAX_AGE_SECONDS * 1000;
  const payload = `${nonce}.${expiresAt}`;
  const signature = await sign(payload, secret);
  return `${payload}.${signature}`;
}

export async function verifyMouSessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;

  const secret = getMouSessionSecret();
  if (!secret) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [nonce, expiresAt, signature] = parts;
  if (!nonce || !expiresAt || !signature) return false;

  const expires = Number(expiresAt);
  if (!Number.isFinite(expires) || expires < Date.now()) return false;

  const payload = `${nonce}.${expiresAt}`;
  const expected = await sign(payload, secret);
  if (!safeEqual(signature, expected)) return false;

  try {
    fromBase64Url(nonce);
  } catch {
    return false;
  }

  return true;
}

export function getMouCookieOptions(maxAge = MOU_MAX_AGE_SECONDS) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}
