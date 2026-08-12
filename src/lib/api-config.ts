/**
 * Central configuration for data fetching.
 *
 * API_BASE_URL is empty in development (the app fetches from its own
 * built-in mock API route at /api/data).  In production, set the
 * API_URL server-only environment variable to your headless CMS /
 * custom backend origin, e.g.:
 *
 *   API_URL=https://cms.anntnandasfoundation.com
 *
 * ISR revalidation intervals (in seconds) control how long a
 * server-rendered page stays fresh before Next.js regenerates it.
 * Pages with rapidly-changing content (news, events) use shorter
 * intervals; static config uses longer ones.
 */

export const API_BASE_URL = process.env.API_URL || "";

export const API_PATHS = {
  /** Single endpoint that returns the entire data payload (mock only). */
  ALL_DATA: "/api/data",
} as const;

/** ISR revalidation windows — tuned per content type. */
export const REVALIDATE = {
  HOME: 60 * 60,            // 1 hour   — homepage aggregate
  SITE_CONFIG: 24 * 60 * 60,  // 24 hours — static config, rarely changes
  NEWS: 30 * 60,             // 30 min   — news is updated frequently
  EVENTS: 30 * 60,           // 30 min   — events change often
  GALLERY: 2 * 60 * 60,       // 2 hours  — gallery images
  ABOUT: 12 * 60 * 60,        // 12 hours — about page
  PROGRAMS: 12 * 60 * 60,    // 12 hours
  DONATE: 12 * 60 * 60,      // 12 hours
  CONTACT: 12 * 60 * 60,     // 12 hours
} as const;

/** HTTP headers sent with every mock-API request. */
export const DEFAULT_CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
} as const;