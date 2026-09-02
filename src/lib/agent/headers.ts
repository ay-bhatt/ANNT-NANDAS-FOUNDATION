import { markdownUrlFor, SITE_URL } from "./site";

export const VARY_ACCEPT = "Accept, Accept-Encoding";
export const MARKDOWN_CONTENT_TYPE = "text/markdown; charset=utf-8";

export function negotiationHeaders(pathname: string): Record<string, string> {
  const markdownPath = markdownUrlFor(pathname);
  return {
    Vary: VARY_ACCEPT,
    Link: `</llms.txt>; rel="describedby", <${markdownPath}>; rel="alternate"; type="text/markdown"`,
    "Cache-Control": "public, max-age=300, must-revalidate",
  };
}

export function notFoundHeaders(): Record<string, string> {
  return {
    Vary: VARY_ACCEPT,
    Link: `</llms.txt>; rel="describedby", </sitemap.xml>; rel="index", <${SITE_URL}/llms.txt>; rel="describedby"`,
    "Cache-Control": "public, max-age=60, must-revalidate",
    "X-Robots-Tag": "noindex, nofollow",
  };
}

export function documentHeaders(): Record<string, string> {
  return {
    Vary: VARY_ACCEPT,
    Link: `</llms.txt>; rel="describedby"`,
    "Cache-Control": "public, max-age=300, must-revalidate",
  };
}
