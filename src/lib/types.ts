/**
 * TypeScript interfaces for all content entities managed by the backend/CMS.
 * These types describe the shape of data returned by any API endpoint
 * (Sanity, Strapi, Supabase, or the local mock in Phase 1).
 *
 * Image fields use `string` (URL) rather than `StaticImageData` because:
 *   1. JSON can only represent images as URL strings.
 *   2. A CMS always returns image URLs, never webpack import objects.
 *   3. `next/image` accepts string URLs for both local (/_next/static/media/*)
 *      and remote (https://cdn.example.com/*) images.
 */

// ─────────────────────────
//  Image
// ─────────────────────────

/** Any image source — local path or remote URL. */
export type ImageSrc = string;

// ─────────────────────────
//  Site Configuration
// ─────────────────────────

export interface SocialLinks {
  email: string;
  facebook: string;
  instagram: string;
  youtube: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  motto: string;
  description: string;
  email: string;
  phone1: string;
  phone2: string;
  address: string;
  founded: string;
  registered: string;
  founder: string;
  registrationNo?: string;
  darpanId?: string;
  tan?: string;
  registration12A?: string;
  registration80G?: string;
  social: SocialLinks;
}

export interface NavItem {
  label: string;
  href: string;
}

// ─────────────────────────
//  Hero
// ─────────────────────────

export interface CTA {
  label: string;
  href: string;
}

export interface FloatingCard {
  title: string;
  image: ImageSrc;
}

export interface HeroContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  description: string;
  ctaPrimary: CTA;
  ctaSecondary: CTA;
  image: ImageSrc;
  backgroundImage: ImageSrc;
  floatingCards: FloatingCard[];
  supportingVisuals: ImageSrc[];
}

// ─────────────────────────
//  Impact & Stats
// ─────────────────────────

export type StatIcon = "villages" | "children" | "events" | "volunteers" | "trees" | "partners";

export interface ImpactStat {
  label: string;
  value: string;
  icon: StatIcon;
}

export interface StoryChapter {
  title: string;
  description: string;
}

export interface TalentDiscoveryStep {
  title: string;
  description: string;
}

export interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
}

export interface CoreValue {
  icon: string;
  title: string;
  desc: string;
}

// ─────────────────────────
//  Founder
// ─────────────────────────

export interface FounderInfo {
  name: string;
  title: string;
  description: string;
  fullBio: string;
  image: ImageSrc;
  achievements: string[];
  quote: string;
}

// ─────────────────────────
//  Impact Areas & Programs
// ─────────────────────────

export interface ImpactArea {
  title: string;
  icon: string;
  description: string;
  color: string;
  image: ImageSrc;
  gallery: ImageSrc[];
  points: string[];
}

export interface FeatureCard {
  title: string;
  description: string;
  image: ImageSrc;
  href: string;
  icon: string;
}

// ─────────────────────────
//  Events
// ─────────────────────────

export interface UpcomingEvent {
  title: string;
  date: string;
  day: string;
  month: string;
  location: string;
  time: string;
  description: string;
  type: string;
  image: ImageSrc;
  href: string;
}

// ─────────────────────────
//  News
// ─────────────────────────

export interface NewsItem {
  title: string;
  date: string;
  summary: string;
  category: string;
  image: ImageSrc;
}

// ─────────────────────────
//  Testimonials
// ─────────────────────────

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: ImageSrc;
  rating: number;
}

// ─────────────────────────
//  Partners
// ─────────────────────────

export interface Partner {
  name: string;
  category: string;
}

// ─────────────────────────
//  Donations
// ─────────────────────────

export interface DonationImpact {
  amount: number;
  impact: string;
}

export interface DonationInfo {
  qrImage: ImageSrc;
  upiId: string;
  title: string;
  description: string;
  instructions: string[];
}

// ─────────────────────────
//  Gallery
// ─────────────────────────

export type GalleryItemType = "photo" | "video";

export interface GalleryItem {
  label: string;
  type: GalleryItemType;
  imageSrc: ImageSrc;
  theme: string;
}

// ─────────────────────────
//  Form Options
// ─────────────────────────

export interface FormOptions {
  genderOptions: string[];
  occupationOptions: string[];
}

// ─────────────────────────
//  Aggregated API Response
// ─────────────────────────

/** Shape of the complete payload returned by `GET /api/data`. */
export interface AllData {
  siteConfig: SiteConfig;
  navigationItems: NavItem[];
  heroContent: HeroContent;
  impactStats: ImpactStat[];
  storyChapters: StoryChapter[];
  talentDiscoverySteps: TalentDiscoveryStep[];
  journeyMilestones: JourneyMilestone[];
  coreValues: CoreValue[];
  foundersGallery: ImageSrc[];
  founderInfo: FounderInfo;
  impactAreas: ImpactArea[];
  featureCards: FeatureCard[];
  upcomingEvents: UpcomingEvent[];
  newsItems: NewsItem[];
  testimonials: Testimonial[];
  partners: Partner[];
  donationImpacts: DonationImpact[];
  donationInfo: DonationInfo;
  donationAmounts: number[];
  galleryCategories: string[];
  galleryItems: GalleryItem[];
  collageImages: ImageSrc[];
  homeVisualGrid: ImageSrc[];
  newsHeroImage: ImageSrc;
  formOptions: FormOptions;
}