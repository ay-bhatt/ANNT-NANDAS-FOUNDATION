import Image from "next/image";
import type { Metadata } from "next";
import { getAllData } from "@/lib/api";

export const metadata: Metadata = {
  title: "News & Updates | ANNT NANDAS FOUNDATION",
  description: "Follow recent foundation activities, field updates, achievements, and stories from Himalayan communities.",
  alternates: { canonical: "/news" },
};
import { CTASection, PageHero, SectionHeading } from "@/components/site/SectionBlocks";

export default async function NewsPage() {
  const data = await getAllData();
  const { heroContent, newsHeroImage, newsItems } = data;
  return (
    <div className="pb-8">
      <PageHero
        eyebrow="Latest News"
        title="Stories, updates, and progress from the field"
        description="Stay connected with the foundation’s latest activities, milestones, village outreach, and programme moments."
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
            description="A curated collection of stories that reflect the foundation’s grassroots work across communities and programmes."
            centered
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {newsItems.map((item) => (
              <article key={item.title} className="surface-card overflow-hidden">
                <div className="relative aspect-[16/10]">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">{item.category}</span>
                    <span className="text-slate-400">{item.date}</span>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-slate-950">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want more updates from the foundation?"
        description="Reach out, follow our channels, or visit upcoming events to stay closely connected to the work happening on the ground."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "View Events", href: "/events" }}
        image={heroContent.supportingVisuals[2]}
      />
    </div>
  );
}
