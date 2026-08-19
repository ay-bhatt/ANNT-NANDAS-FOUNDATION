/**
 * Mock backend API route.
 *
 * In development this serves all content as JSON from the existing
 * `src/lib/data.ts` seed data.  The data is **serialized** — every
 * `StaticImageData` import is converted to its `.src` URL string so the
 * response is plain JSON.
 *
 * When you're ready to connect a real CMS (Sanity / Strapi / Supabase),
 * you will:
 *   1. Point server-only `API_URL` to your CMS origin in `.env.local`.
 *   2. The API client (`src/lib/api.ts`) will automatically fetch from
 *      that origin instead of `/api/data`.
 *   3. Optionally delete this mock route entirely, or keep it as a
 *      fallback for offline development.
 *
 * ── ISR ─────────────────────────────────────────────────────
 * The response includes a `Cache-Control` header that makes the JSON
 * CDN-cacheable.  Next.js's `fetch(..., { next: { revalidate } })` in
 * `api.ts` controls the server-side revalidation window per-call.
 */

import { NextResponse } from "next/server";
import type { AllData } from "@/lib/types";
import * as D from "@/lib/data";
import { DEFAULT_CACHE_HEADERS } from "@/lib/api-config";

// ── Helpers ────────────────────────────────────────────────

/**
 * Convert any image reference to a plain URL string.
 * - `StaticImageData` → `.src` (e.g. "/_next/static/media/HERO.abc123.jpeg")
 * - `string`          → returned as-is (already a URL)
 * - `undefined`       → "" (empty string)
 */
function img(img: unknown): string {
  if (!img) return "";
  if (typeof img === "string") return img;
  if (typeof img === "object" && img !== null && "src" in img) {
    return String((img as { src: string }).src);
  }
  return "";
}

// ── Serialization ──────────────────────────────────────────

function serializeHeroContent(): AllData["heroContent"] {
  return {
    ...D.heroContent,
    image: img(D.heroContent.image),
    backgroundImage: img(D.heroContent.backgroundImage),
    floatingCards: D.heroContent.floatingCards.map((fc) => ({
      title: fc.title,
      image: img(fc.image),
    })),
    supportingVisuals: D.heroContent.supportingVisuals.map(img),
  };
}

function serializePublicSiteConfig(): AllData["siteConfig"] {
  const publicConfig: AllData["siteConfig"] = { ...D.siteConfig };
  delete publicConfig.registrationNo;
  delete publicConfig.darpanId;
  delete publicConfig.tan;
  delete publicConfig.registration12A;
  delete publicConfig.registration80G;
  return publicConfig;
}

function serializeFounderInfo(): AllData["founderInfo"] {
  return {
    ...D.founderInfo,
    image: img(D.founderInfo.image),
  };
}

function serializeImpactAreas(): AllData["impactAreas"] {
  return D.impactAreas.map((area) => ({
    ...area,
    image: img(area.image),
    gallery: area.gallery.map(img),
  }));
}

function serializeFeatureCards(): AllData["featureCards"] {
  return D.impactAreas.map((area) => ({
    title: area.title,
    description: area.description,
    image: img(area.image),
    href: "/programs",
    icon: area.icon,
  }));
}

function serializeEvents(): AllData["upcomingEvents"] {
  return D.upcomingEvents.map((e) => ({ ...e, image: img(e.image) }));
}

function serializeNews(): AllData["newsItems"] {
  return D.newsItems.map((n) => ({ ...n, image: img(n.image) }));
}

function serializeTestimonials(): AllData["testimonials"] {
  return D.testimonials.map((t) => ({ ...t, image: img(t.image) }));
}

function serializeDonationInfo(): AllData["donationInfo"] {
  return {
    ...D.donationInfo,
    qrImage: img(D.donationInfo.qrImage),
  };
}

function serializeGalleryItems(): AllData["galleryItems"] {
  return D.galleryItems.map((g) => ({ ...g, imageSrc: img(g.imageSrc) })) as AllData["galleryItems"];
}

// ── Main handler ───────────────────────────────────────────

export async function GET() {
  try {
    const all: AllData = {
      siteConfig: serializePublicSiteConfig(),
      navigationItems: D.navigationItems,
      heroContent: serializeHeroContent(),
      impactStats: D.impactStats as AllData["impactStats"],
      storyChapters: D.storyChapters,
      talentDiscoverySteps: D.talentDiscoverySteps,
      journeyMilestones: D.journeyMilestones,
      coreValues: D.coreValues,
      foundersGallery: D.foundersGallery.map(img),
      founderInfo: serializeFounderInfo(),
      impactAreas: serializeImpactAreas(),
      featureCards: serializeFeatureCards(),
      upcomingEvents: serializeEvents(),
      newsItems: serializeNews(),
      testimonials: serializeTestimonials(),
      partners: D.partners,
      donationImpacts: D.donationImpacts,
      donationInfo: serializeDonationInfo(),
      donationAmounts: D.donationAmounts,
      volunteerOpportunities: D.volunteerOpportunities,
      galleryCategories: D.galleryCategories,
      galleryItems: serializeGalleryItems(),
      collageImages: D.collageImages.map(img),
      homeVisualGrid: D.homeVisualGrid.map(img),
      newsHeroImage: img(D.newsHeroImage),
      formOptions: {
        genderOptions: D.genderOptions,
        occupationOptions: D.occupationOptions,
      },
    };

    return NextResponse.json(all, {
      headers: DEFAULT_CACHE_HEADERS,
    });
  } catch (error: unknown) {
    console.error("[api/data] GET handler error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// Allow the route to be used during SSG/ISR.
// In a real backend this would be a standalone Express/Fastify app,
// but for Phase 1 the Next.js route handler keeps everything in one repo.
export const dynamic = "force-static";
export const revalidate = 3600; // 1 hour default for the mock route itself
