export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anntnandasfoundation.com";

export const PAGE_PATHS = [
  "/",
  "/about",
  "/our-work",
  "/programs",
  "/events",
  "/gallery",
  "/news",
  "/contact",
  "/donate",
  "/register",
  "/volunteer-registration",
  "/membership-registration",
  "/sports-registration",
  "/running-registration",
  "/general-registration",
  "/employee-registration",
  "/privacy",
  "/privacy-policy",
  "/terms",
  "/cookie-policy",
  "/accessibility",
  "/refund-policy",
] as const;

export type PagePath = (typeof PAGE_PATHS)[number];

const PAGE_PATH_SET = new Set<string>(PAGE_PATHS);

export const DOCUMENT_PATHS = ["/llms.txt", "/agent-instructions"] as const;

export function normalizePath(pathname: string): string {
  const path = pathname.split("?")[0]?.split("#")[0] || "/";
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path || "/";
}

export function isKnownPage(pathname: string): pathname is PagePath {
  return PAGE_PATH_SET.has(normalizePath(pathname));
}

export function isDocumentPath(pathname: string): boolean {
  return (DOCUMENT_PATHS as readonly string[]).includes(normalizePath(pathname));
}

export function markdownUrlFor(pathname: string): string {
  const path = normalizePath(pathname);
  if (path === "/") return "/index.md";
  return `${path}.md`;
}

export function markdownPathToPage(pathname: string): string | null {
  const path = normalizePath(pathname);
  if (path === "/index.md") return "/";
  if (path.endsWith("/index.md")) {
    const parent = path.slice(0, -"/index.md".length);
    return parent || "/";
  }
  if (path.endsWith(".md")) {
    return path.slice(0, -3) || "/";
  }
  return null;
}

export function hasPassthroughExtension(pathname: string): boolean {
  const path = normalizePath(pathname);
  if (path === "/llms.txt") return false;
  return /\.[a-zA-Z0-9]+$/.test(path) && !path.endsWith(".md");
}

export function absoluteUrl(pathname: string): string {
  if (pathname.startsWith("http")) return pathname;
  return `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
}
