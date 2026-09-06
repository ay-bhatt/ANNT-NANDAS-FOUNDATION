import type { Metadata } from "next";
import { getAllData } from "@/lib/api";
import { CTASection } from "@/components/site/SectionBlocks";
import JsonLd from "@/components/site/JsonLd";
import HeroSection from "@/components/sections/HeroSection";
import FeatureCardsSection from "@/components/sections/FeatureCardsSection";
import AboutStatsSection from "@/components/sections/AboutStatsSection";
import FounderAchievementsSection from "@/components/sections/FounderAchievementsSection";
import StoryJourneySection from "@/components/sections/StoryJourneySection";
import ImpactStatsSection from "@/components/sections/ImpactStatsSection";
import EventsTestimonialsSection from "@/components/sections/EventsTestimonialsSection";
import NewsGalleryPreviewSection from "@/components/sections/NewsGalleryPreviewSection";
import HomeDonationSection from "@/components/sections/HomeDonationSection";
import VolunteerOpportunitiesSection from "@/components/sections/VolunteerOpportunitiesSection";
import HomeOverviewSection from "@/components/sections/HomeOverviewSection";
import SidePeekRail from "@/components/SidePeekRail";

export const metadata: Metadata = {
  title: "ANNT NANDAS FOUNDATION | Building Futures Without Limits",
  description:
    "ANNT NANDAS FOUNDATION is a Himalayan non-profit founded by Kalam Singh Bisht, COAS and GOC-in-C commendation awardee and 120 KM Hajar Ultra Trail Run champion, empowering communities through education, health, and sports.",
  keywords:
    "ANNT NANDAS FOUNDATION, Kalam Singh Bisht, NGO Uttarakhand, Himalayas, COAS Commendation, GOC-in-C Commendation, Governor Award, Hajar Ultra Trail Run, ultra trail running, education, healthcare, sports development",
  alternates: {
    canonical: "/",
    types: { "text/markdown": "/index.md" },
  },
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
    homeSlideshowPhotos,
    heroSlideshowPhotos,
    pageVisuals,
    donationInfo,
    donationAmounts,
    volunteerOpportunities,
    siteConfig,
  } = data;

  return (
    <>
      <JsonLd />
      <SidePeekRail events={upcomingEvents} newsItems={newsItems} />
      <HeroSection
        heroContent={heroContent}
        impactStats={impactStats}
        motto={siteConfig.motto}
        mottoHi={siteConfig.mottoHi}
        slideshowPhotos={heroSlideshowPhotos}
      />
      <HomeOverviewSection
        images={[
          { src: pageVisuals.overviewPrimary, label: "Foundation team in the high Himalaya" },
          { src: pageVisuals.overviewSecondary, label: "Celebrating endurance and grit" },
        ]}
      />
      <FeatureCardsSection featureCards={featureCards} />
      <AboutStatsSection
        heroContent={heroContent}
        founderInfo={founderInfo}
        impactStats={impactStats}
        collageImages={collageImages}
        communityImage={pageVisuals.communityRooted}
      />
      <FounderAchievementsSection founderInfo={founderInfo} />
      <StoryJourneySection
        storyChapters={storyChapters}
        homeVisualGrid={homeVisualGrid}
      />
      <ImpactStatsSection impactStats={impactStats} />
      <EventsTestimonialsSection
        upcomingEvents={upcomingEvents}
        testimonials={testimonials}
      />
      <VolunteerOpportunitiesSection opportunities={volunteerOpportunities} />
      <NewsGalleryPreviewSection
        newsItems={newsItems}
        slideshowPhotos={homeSlideshowPhotos}
      />
      <HomeDonationSection donation={donationInfo} amounts={donationAmounts} />
      <CTASection
        title="Help us build brighter futures in the Himalayas"
        description="Whether you volunteer, donate, or collaborate, your support helps create meaningful long-term change."
        primary={{ label: "Become a Volunteer", href: "/volunteer-registration" }}
        secondary={{ label: "Donate Today", href: "/donate" }}
        image={pageVisuals.homeCta}
      />
    </>
  );
}
