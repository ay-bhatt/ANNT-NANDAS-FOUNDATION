import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  output: "standalone",
  // Tell Next.js the correct project root — a parent directory (C:\Users\aybha)
  // contains an unrelated package-lock.json that would otherwise be detected as
  // the workspace root, breaking production builds (PageNotFoundError).
  outputFileTracingRoot: path.join(__dirname),

  // Removed "output: 'export'" to enable:
  // - App Router API route handlers (for local mock backend)
  // - Incremental Static Regeneration (ISR)
  // - Server Actions / Route Handlers (Phase 3: forms)
  images: {
    // For Phase 1 we keep images unoptimized so the existing local asset URLs
    // (/_next/static/media/*) render without extra configuration.
    // In Phase 4 we will remove `unoptimized` and add remotePatterns for
    // your headless CMS / CDN image domains.
    unoptimized: process.env.NODE_ENV !== "production",
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // ---- Add your CMS / CDN domains here in production ----
      // Example for Sanity:
      // { protocol: "https", hostname: "cdn.sanity.io" },
      // Example for Strapi:
      // { protocol: "https", hostname: "images.strapi.io" },
      // Example for Cloudinary:
      // { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  // Server Actions are enabled by default in Next.js 15, but we set it
  // explicitly for clarity.
  experimental: {
    ppr: false,
  },
  async headers() {
    const contentSecurityPolicy = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "connect-src 'self' https:",
      "frame-src https://www.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          ...(process.env.NODE_ENV === "production"
            ? [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }]
            : []),
        ],
      },
    ];
  },
};

export default nextConfig;