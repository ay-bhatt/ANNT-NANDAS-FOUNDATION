const fs = require('fs');

const content = `import { getAllData } from "@/lib/api";
import { CTASection } from "@/components/site/SectionBlocks";
import HeroSection from "@/components/sections/HeroSection";
import FeatureCardsSection from "@/components/sections/FeatureCardsSection";
import AboutStatsSection from "@/components/sections/AboutStatsSection";
import StoryJourneySection from "@/components/sections/StoryJourneySection";
import ImpactStatsSection from "@/components/sections/ImpactStatsSection";
import EventsTestimonialsSection from "@/components/sections/EventsTestimonialsSection";
import NewsGalleryPreviewSection from "@/components/sections/NewsGalleryPreviewSection";

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
      <NewsGalleryPreviewSection
        newsItems={newsItems}
        collageImages={collageImages}
        homeVisualGrid={homeVisualGrid}
      />
      <CTASection
        title="Help us build brighter futures in the Himalayas"
        description="Whether you volunteer, donate, or collaborate, your support helps create meaningful long-term change."
        primary={{ label: "Become a Volunteer", href: "/volunteer-registration" }}
        secondary={{ label: "Donate Today", href: "/donate" }}
        image={heroContent.image}
      />
    </>
  );
}`;

fs.writeFileSync('src/app/page.tsx', content, 'utf-8');
console.log('page.tsx written successfully');
console.log('File size:', fs.statSync('src/app/page.tsx').size, 'bytes');
console.log('Line count:', content.split('\n').length, 'lines');
