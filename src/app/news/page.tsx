import type { Metadata } from "next";
import { getAllData } from "@/lib/api";

export const metadata: Metadata = {
  title: "News & Updates | ANNT NANDAS FOUNDATION",
  description: "Follow recent foundation activities, awareness initiatives, running, MTB cycling, and talent hunt updates from Himalayan communities.",
  alternates: { canonical: "/news" },
};
import { CTASection, PageHero, SectionHeading } from "@/components/site/SectionBlocks";
import NewsCardGrid from "@/components/news/NewsCardGrid";

export default async function NewsPage() {
  const data = await getAllData();
  const { pageVisuals, newsHeroImage, newsItems } = data;
  return (
    <div className="pb-8">
      <PageHero
        eyebrow="Latest News"
        title="Stories, updates, and progress from the field"
        description="Stay connected with the foundation’s latest activities, awareness initiatives, sports programmes, and talent development updates."
        image={newsHeroImage}
        actions={[
          { label: "Contact the Team", href: "/contact" },
          { label: "Explore Gallery", href: "/gallery", variant: "secondary" },
        ]}
      />

      <section className="section-padding px-3 sm:px-5">
        <div className="container-premium">
          <SectionHeading
            eyebrow="News & Updates"
            title="A closer look at recent momentum"
            description="Explore individual updates across our awareness initiatives, youth running, State MTB Cycling Team Selection, and Talent Hunt Program."
            centered
          />
          <NewsCardGrid items={newsItems} variant="grid" />
        </div>
      </section>

      <CTASection
        title="Want more updates from the foundation?"
        description="Reach out, follow our channels, or visit upcoming events to stay closely connected to the work happening on the ground."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "View Events", href: "/events" }}
        image={pageVisuals.newsCta}
      />
    </div>
  );
}
