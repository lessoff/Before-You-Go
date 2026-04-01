interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store — per serverless instance.
// Good enough for a personal project; swap for Upstash Redis for multi-instance production.
const store = new Map<string, RateLimitEntry>();

// Prune expired entries every 5 minutes to prevent memory leaks in long-running instances.
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}, 5 * 60 * 1000);

export function rateLimit(
  ip: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; retryAfterSecs: number } {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSecs: 0 };
  }

  if (entry.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSecs: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count++;
  return { allowed: true, remaining: limit - entry.count, retryAfterSecs: 0 };
}

export function getIP(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}
