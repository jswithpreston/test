/**
 * Converts a string into a URL-friendly slug.
 * e.g. "Won Nyaci Launches Greening Lango" → "won-nyaci-launches-greening-lango"
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // strip non-word chars (keep hyphens)
    .replace(/[\s_]+/g, '-')  // spaces and underscores → hyphens
    .replace(/--+/g, '-')     // collapse multiple hyphens
    .replace(/^-+|-+$/g, '')  // strip leading/trailing hyphens
}
