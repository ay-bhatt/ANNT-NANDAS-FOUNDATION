type AttemptState = {
  count: number;
  resetAt: number;
};

const loginAttempts = new Map<string, AttemptState>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function prune(now: number) {
  for (const [key, state] of loginAttempts) {
    if (state.resetAt <= now) {
      loginAttempts.delete(key);
    }
  }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

export function checkMouLoginRateLimit(ip: string): { allowed: boolean } {
  const now = Date.now();
  prune(now);

  const current = loginAttempts.get(ip);
  if (!current || current.resetAt <= now) {
    loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (current.count >= MAX_ATTEMPTS) {
    return { allowed: false };
  }

  current.count += 1;
  return { allowed: true };
}

export function resetMouLoginRateLimit(ip: string) {
  loginAttempts.delete(ip);
}
