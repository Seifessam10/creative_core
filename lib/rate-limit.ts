/**
 * Best-effort per-IP rate limit for the inquiry endpoint (PRD §5 step 3).
 * In-memory only — it resets on cold start and isn't shared across
 * serverless instances, which is a known V1 shortcut. If real abuse shows
 * up, swap this for Upstash Redis + @upstash/ratelimit (drop-in: same
 * check/record shape) without changing the route handler.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > MAX_REQUESTS;
}
