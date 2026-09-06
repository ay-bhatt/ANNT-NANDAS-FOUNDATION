import "server-only";

function safeEqual(a: string, b: string): boolean {
  const maxLength = Math.max(a.length, b.length);
  let diff = a.length === b.length ? 0 : 1;
  for (let i = 0; i < maxLength; i += 1) {
    const left = a.charCodeAt(i) || 0;
    const right = b.charCodeAt(i) || 0;
    diff |= left ^ right;
  }
  return diff === 0;
}

export function getMouAdminPassword(): string | null {
  const password = process.env.MOU_ADMIN_PASSWORD;
  return password && password.length > 0 ? password : null;
}

export function verifyMouPassword(input: string): boolean {
  const expected = getMouAdminPassword();
  if (!expected) return false;
  return safeEqual(input, expected);
}
