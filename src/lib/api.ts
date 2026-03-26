/**
 * Typed fetch wrapper for the Payload REST API.
 *
 * - Validates NEXT_PUBLIC_SERVER_URL before attempting any request
 * - Enforces a 5-second timeout so a slow/unavailable API never hangs SSR
 * - Returns null on any error so callers can gracefully fall back
 */

const TIMEOUT_MS = 5_000

export async function fetchAPI<T>(
  /** Path + query string, e.g. "/api/posts?limit=3" */
  endpoint: string,
  options?: RequestInit & { next?: { revalidate?: number; tags?: string[] } },
): Promise<T | null> {
  const base = process.env.NEXT_PUBLIC_SERVER_URL

  // Guard: skip the request if the base URL is missing or obviously invalid
  if (!base) return null
  try {
    new URL(base) // throws if not an absolute URL
  } catch {
    return null
  }

  try {
    const res = await fetch(`${base}${endpoint}`, {
      ...options,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    // Network error, timeout (AbortError), or JSON parse failure
    return null
  }
}
