import type { MetadataRoute } from "next";

const routes = [
  "",
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
  "/privacy-policy",
  "/terms",
  "/cookie-policy",
  "/accessibility",
  "/refund-policy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anntnandasfoundation.com";
  const now = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/news" || route === "/events" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/donate" ? 0.9 : 0.8,
  }));
}
