import { getAllData } from "@/lib/api";
import type { Metadata } from "next";
import { CTASection, PageHero, SectionHeading } from "@/components/site/SectionBlocks";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery | ANNT NANDAS FOUNDATION",
  description: "See real moments from foundation programs, community events, learning sessions, and Himalayan fieldwork.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const data = await getAllData();
  const { heroContent, galleryCategories, galleryItems } = data;

  return (
    <div className="pb-8">
      <PageHero
        eyebrow="Gallery"
        title="Moments of hope, effort, and transformation"
        description="A visual record of the foundation's work across programmes, villages, events, and everyday stories of participation."
        image={heroContent.image}
        actions={[
          { label: "View Events", href: "/events" },
          { label: "Read News", href: "/news", variant: "secondary" },
        ]}
      />

      <SectionHeading eyebrow="Photos & Videos" title="Real field moments, beautifully presented" centered />

      <GalleryGrid items={galleryItems} categories={galleryCategories} />

      <CTASection
        title="Want to see these stories in person?"
        description="Join an event, volunteer with the team, or contact us to support the work behind these moments."
        primary={{ label: "Volunteer With Us", href: "/volunteer-registration" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
        image={heroContent.supportingVisuals[1]}
      />
    </div>
  );
}

