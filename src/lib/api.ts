/**
 * Typed API client.
 *
 * Every function is `async` and designed to be called from **Server
 * Components only** (it uses `fetch` with Next.js `next: { revalidate }`
 * for ISR).  Client Components receive the resolved data as props.
 *
 * ── How it works ─────────────────────────────────────────────
 *  1. Development  — `API_URL` is unset, so requests use the
 *                     local mock route  /api/data  (served by this app).
 *
 *  2. Production   — set API_URL=https://cms.example.com
 *                     and every call automatically targets your real
 *                     backend / headless CMS with zero code changes.
 *
 * ── ISR ─────────────────────────────────────────────────────
 * Each function passes `next: { revalidate: N }` so Next.js caches the
 * response at the Edge / server level for N seconds.  After N seconds the
 * *next* request triggers a background revalidation (stale-while-revalidate),
 * so the page is never slow for users.
 */

import "server-only";
import { cache } from "react";
import type {
  AllData,
  SiteConfig,
  NavItem,
  HeroContent,
  ImpactStat,
  ImpactArea,
  FeatureCard,
  StoryChapter,
  Testimonial,
  NewsItem,
  UpcomingEvent,
  FounderInfo,
  CoreValue,
  JourneyMilestone,
  DonationImpact,
  DonationInfo,
  GalleryItem,
  FormOptions,
  ImageSrc,
} from "./types";
import { API_BASE_URL, API_PATHS, REVALIDATE } from "./api-config";

// ─────────────────────────────────────────────────────────
//  Low-level fetch helper
// ─────────────────────────────────────────────────────────

async function fetchAPI<T>(path: string, revalidate: number): Promise<T> {
  // ── Production: external CMS or backend ─────────────────
  if (API_BASE_URL) {
    const base = new URL(API_BASE_URL);
    if (base.protocol !== "https:" && !(base.protocol === "http:" && base.hostname === "localhost")) {
      throw new Error("API_URL must use HTTPS outside local development.");
    }
    const url = new URL(path, base);
    const res = await fetch(url, {
      next: { revalidate },
      redirect: "error",
    });
    if (!res.ok) {
      throw new Error(`API request to ${path} failed with status ${res.status}.`);
    }
    return (await res.json()) as T;
  }

  // The local content route is called in-process. This avoids trusting the
  // incoming Host header and works consistently during static generation.
  if (path === API_PATHS.ALL_DATA) {
    const { GET } = await import("@/app/api/data/route");
    const response = await GET();
    if (!response.ok) {
      throw new Error(`Local content API failed with status ${response.status}.`);
    }
    return (await response.json()) as T;
  }

  throw new Error(`No local handler is registered for "${path}".`);
}

// ─────────────────────────────────────────────────────────
//  Public API functions
// ─────────────────────────────────────────────────────────

/**
 * Fetch the entire data payload from the API.
 *
 * In development this hits the local mock route `/api/data`.
 * In production it hits `${API_URL}/api/data`.
 * Next.js automatically dedupes identical fetch calls within a single
 * request cycle, so calling this from layout + page + components
 * results in only ONE network round-trip.
 */
export const getAllData = cache(async (): Promise<AllData> => {
  return fetchAPI<AllData>(API_PATHS.ALL_DATA, REVALIDATE.HOME);
});

// ── Convenience wrappers ──
// Each calls getAllData() — thanks to Next.js fetch deduping, only the
// *first* call per request cycle actually hits the network.  Subsequent
// calls return the cached Promise instantly.

export async function getSiteConfig(): Promise<SiteConfig> {
  const d = await getAllData();
  return d.siteConfig;
}

export async function getNavigationItems(): Promise<NavItem[]> {
  const d = await getAllData();
  return d.navigationItems;
}

export async function getHeroContent(): Promise<HeroContent> {
  const d = await getAllData();
  return d.heroContent;
}

export async function getImpactStats(): Promise<ImpactStat[]> {
  const d = await getAllData();
  return d.impactStats;
}

export async function getImpactAreas(): Promise<ImpactArea[]> {
  const d = await getAllData();
  return d.impactAreas;
}

export async function getFeatureCards(): Promise<FeatureCard[]> {
  const d = await getAllData();
  return d.featureCards;
}

export async function getStoryChapters(): Promise<StoryChapter[]> {
  const d = await getAllData();
  return d.storyChapters;
}

export async function getFounderInfo(): Promise<FounderInfo> {
  const d = await getAllData();
  return d.founderInfo;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const d = await getAllData();
  return d.testimonials;
}

export async function getNewsItems(): Promise<NewsItem[]> {
  const d = await getAllData();
  return d.newsItems;
}

export async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  const d = await getAllData();
  return d.upcomingEvents;
}

export async function getDonationInfo(): Promise<DonationInfo> {
  const d = await getAllData();
  return d.donationInfo;
}

export async function getDonationImpacts(): Promise<DonationImpact[]> {
  const d = await getAllData();
  return d.donationImpacts;
}

export async function getDonationAmounts(): Promise<number[]> {
  const d = await getAllData();
  return d.donationAmounts;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const d = await getAllData();
  return d.galleryItems;
}

export async function getCollageImages(): Promise<ImageSrc[]> {
  const d = await getAllData();
  return d.collageImages;
}

export async function getHomeVisualGrid(): Promise<ImageSrc[]> {
  const d = await getAllData();
  return d.homeVisualGrid;
}

export async function getFormOptions(): Promise<FormOptions> {
  const d = await getAllData();
  return d.formOptions;
}

export async function getCoreValues(): Promise<CoreValue[]> {
  const d = await getAllData();
  return d.coreValues;
}

export async function getJourneyMilestones(): Promise<JourneyMilestone[]> {
  const d = await getAllData();
  return d.journeyMilestones;
}

export async function getFoundersGallery(): Promise<ImageSrc[]> {
  const d = await getAllData();
  return d.foundersGallery;
}

export async function getNewsHeroImage(): Promise<ImageSrc> {
  const d = await getAllData();
  return d.newsHeroImage;
}

export async function getGalleryCategories(): Promise<string[]> {
  const d = await getAllData();
  return d.galleryCategories;
}
