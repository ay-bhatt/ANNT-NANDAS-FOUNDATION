type AttemptState = {
  count: number;
  resetAt: number;
};

const commentAttempts = new Map<string, AttemptState>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export function checkCommentRateLimit(ip: string): boolean {
  const now = Date.now();
  const current = commentAttempts.get(ip);

  if (!current || current.resetAt <= now) {
    commentAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (current.count >= MAX_ATTEMPTS) {
    return false;
  }

  current.count += 1;
  return true;
}
