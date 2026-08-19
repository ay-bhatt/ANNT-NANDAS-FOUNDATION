import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anntnandasfoundation.com";

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/data/", "/anntnandasfoundation/"] }],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
