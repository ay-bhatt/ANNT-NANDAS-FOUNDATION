import type { Metadata } from "next";
import { getAllData } from "@/lib/api";
import { CTASection } from "@/components/site/SectionBlocks";
import HeroSection from "@/components/sections/HeroSection";
import FeatureCardsSection from "@/components/sections/FeatureCardsSection";
import AboutStatsSection from "@/components/sections/AboutStatsSection";
import StoryJourneySection from "@/components/sections/StoryJourneySection";
import ImpactStatsSection from "@/components/sections/ImpactStatsSection";
import EventsTestimonialsSection from "@/components/sections/EventsTestimonialsSection";
import NewsGalleryPreviewSection from "@/components/sections/NewsGalleryPreviewSection";
import HomeDonationSection from "@/components/sections/HomeDonationSection";

export const metadata: Metadata = {
  title: "ANNT NANDAS FOUNDATION | Building Futures Without Limits",
  description:
    "ANNT NANDAS FOUNDATION is a non-profit organization empowering Himalayan communities through education, health, sports, environment, and sustainable development.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const data = await getAllData();

  const {
    heroContent,
    impactStats,
    featureCards,
    founderInfo,
    storyChapters,
    upcomingEvents,
    testimonials,
    newsItems,
    collageImages,
    homeVisualGrid,
    donationInfo,
  } = data;

  return (
    <>
      <HeroSection heroContent={heroContent} impactStats={impactStats} />
      <FeatureCardsSection featureCards={featureCards} />
      <AboutStatsSection
        heroContent={heroContent}
        founderInfo={founderInfo}
        impactStats={impactStats}
        collageImages={collageImages}
      />
      <StoryJourneySection
        storyChapters={storyChapters}
        homeVisualGrid={homeVisualGrid}
      />
      <ImpactStatsSection impactStats={impactStats} />
      <EventsTestimonialsSection
        upcomingEvents={upcomingEvents}
        testimonials={testimonials}
      />
      <NewsGalleryPreviewSection newsItems={newsItems} homeVisualGrid={homeVisualGrid} />
      <HomeDonationSection donation={donationInfo} />
      <CTASection
        title="Help us build brighter futures in the Himalayas"
        description="Whether you volunteer, donate, or collaborate, your support helps create meaningful long-term change."
        primary={{ label: "Become a Volunteer", href: "/volunteer-registration" }}
        secondary={{ label: "Donate Today", href: "/donate" }}
        image={heroContent.image}
      />
    </>
  );
}