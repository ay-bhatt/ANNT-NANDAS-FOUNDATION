import { getAllData } from "@/lib/api";
import type { Metadata } from "next";
import { CTASection, PageHero, SectionHeading, StatGrid } from "@/components/site/SectionBlocks";

export const metadata: Metadata = {
  title: "Our Work | ANNT NANDAS FOUNDATION",
  description: "Learn how the foundation discovers talent, builds trust, and creates sustainable opportunity in Himalayan villages.",
  alternates: { canonical: "/our-work" },
};

export default async function OurWorkPage() {
  const data = await getAllData();
  const { impactAreas, impactStats, storyChapters, talentDiscoverySteps, heroContent } = data;
  return (
    <div className="pb-8">
      <PageHero
        eyebrow="Our Work"
        title="Local action that creates lasting change"
        description="We work across programme areas with a grassroots approach—building trust, discovering potential, and helping communities grow stronger over time."
        image={heroContent.supportingVisuals[2]}
        actions={[
          { label: "View Programs", href: "/programs" },
          { label: "Join Our Mission", href: "/volunteer-registration", variant: "secondary" },
        ]}
      />

      <section className="section-padding px-3 sm:px-5">
        <div className="container-premium">
          <SectionHeading
            eyebrow="What We Do"
            title="Creating visible impact across people and places"
            description="Our work combines direct support, mentorship, awareness, and local participation across multiple interconnected areas."
            centered
          />
          <StatGrid stats={impactStats} />
        </div>
      </section>

      <section className="section-padding bg-white px-3 sm:px-5">
        <div className="container-premium">
          <SectionHeading
            eyebrow="Our Approach"
            title="How we move from outreach to transformation"
            description="The foundation’s work is not one-time distribution or symbolic activity. It is a structured process of engaging, mentoring, and sustaining momentum."
            centered
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { step: "01", title: "Identify", desc: "We identify needs, aspirations, and hidden talent through direct village engagement." },
              { step: "02", title: "Empower", desc: "We provide mentorship, learning, participation, and practical programme support." },
              { step: "03", title: "Transform", desc: "We help communities build confidence, continuity, and a stronger future." },
            ].map((item) => (
              <div key={item.step} className="surface-card flex gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 font-bold text-white">{item.step}</div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {impactAreas.map((item) => (
              <div key={item.title} className="surface-card p-5">
                <div className="mb-3 text-3xl">{item.icon}</div>
                <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding px-3 sm:px-5">
        <div className="container-premium">
          <SectionHeading
            eyebrow="Talent Discovery"
            title="Finding talent. Building character. Creating leaders."
            description="We do not wait for children to find opportunities. We take opportunities to them through a community-based process."
            centered
          />
          <div className="grid gap-4 md:grid-cols-2">
            {talentDiscoverySteps.map((step, index) => (
              <div key={step.title} className="surface-card flex gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">{index + 1}</div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-slate-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white px-3 sm:px-5">
        <div className="container-premium">
          <SectionHeading
            eyebrow="In Practice"
            title="What this looks like on the ground"
            description="Every great movement begins with a single step. These chapters describe how the work grew from Mundoli into a wider Himalayan mission."
            centered
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {storyChapters.map((chapter) => (
              <div key={chapter.title} className="surface-card p-5">
                <h3 className="text-lg font-semibold text-slate-950">{chapter.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{chapter.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want to support our work?"
        description="Your contribution helps us reach more villages, strengthen more programmes, and create greater community-led impact."
        primary={{ label: "Donate Now", href: "/donate" }}
        secondary={{ label: "Volunteer With Us", href: "/volunteer-registration" }}
        image={heroContent.image}
      />
    </div>
  );
}
