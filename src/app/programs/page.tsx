import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllData } from "@/lib/api";

export const metadata: Metadata = {
  title: "Our Programs | ANNT NANDAS FOUNDATION",
  description: "Explore grassroots programs in education, healthcare, sports, environment, women’s empowerment, and livelihoods.",
  alternates: { canonical: "/programs" },
};
import { CTASection, PageHero, SectionHeading } from "@/components/site/SectionBlocks";

export default async function ProgramsPage() {
  const data = await getAllData();
  const { impactAreas, heroContent } = data;
  return (
    <div className="pb-8">
      <PageHero
        eyebrow="Our Programs"
        title="Creating lasting change through holistic community development"
        description="Real development cannot be achieved by focusing on a single issue. A child cannot excel in education without good health. A talented athlete cannot succeed without discipline and guidance. Every programme is designed to turn potential into achievement."
        image={heroContent.supportingVisuals[0]}
        actions={[
          { label: "Support Our Programs", href: "/donate" },
          { label: "Join as Volunteer", href: "/volunteer-registration", variant: "secondary" },
        ]}
      />

      <section className="section-padding px-3 sm:px-5">
        <div className="container-premium grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Why these programmes exist"
              title="Opportunity, not charity alone"
              description="ANNT NANDAS FOUNDATION works across sports, education, skill development, healthcare, environment, women empowerment, and community livelihoods because these strengths depend on one another."
            />
            <div className="space-y-4 text-base leading-8 text-slate-600">
              <p>
                We believe education without health is incomplete. Sports without discipline have little meaning. Employment without skills cannot create lasting independence. Development without protecting nature cannot sustain future generations.
              </p>
              <p>
                Therefore every initiative integrates physical development, education, environmental responsibility, cultural identity, leadership, and social values. Our objective is not simply to improve lives for a day. Our objective is to transform communities.
              </p>
              <p>
                From Mundoli, Chamoli, Uttarakhand, we take opportunities to children rather than waiting for children to find them — discovering hidden talent, guiding each person toward the right path, and building self-reliant Himalayan villages.
              </p>
            </div>
          </div>
          <div className="surface-card p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">Our five commitments</p>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-700">
              {[
                "Discover hidden talent in remote villages.",
                "Guide every individual with mentorship and discipline.",
                "Build self-reliant communities, not dependence.",
                "Preserve Himalayan nature, language, and culture.",
                "Create social impact that lasts for generations.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 text-emerald-600">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white/70 px-3 sm:px-5">
        <div className="container-premium">
          <SectionHeading
            eyebrow="Programme Areas"
            title="Focused initiatives for everyday change"
            description="Each programme is a practical path to empowerment — through learning, health, sport, environment, women’s leadership, and dignified livelihoods."
            centered
          />
          <div className="space-y-8">
            {impactAreas.map((program, index) => (
              <div key={program.title} className="surface-card min-w-0 overflow-hidden">
                <div className={`grid min-w-0 gap-0 lg:grid-cols-2 lg:items-start ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 lg:sticky lg:top-24">
                    <Image src={program.image} alt={program.title} fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 40vw" className="object-cover object-center" />
                  </div>
                  <div className="min-w-0 p-5 sm:p-7 lg:p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-400/15 to-blue-500/15 text-3xl">
                        {program.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">{program.title}</h2>
                    </div>
                    <p className="text-base leading-8 text-slate-600">{program.description}</p>
                    {program.story?.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)} className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                        {paragraph}
                      </p>
                    ))}
                    <ul className="mt-6 grid gap-3">
                      {program.points.map((point) => (
                        <li key={point} className="flex gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 text-sm leading-7 text-slate-700">
                          <span className="mt-1 text-emerald-600">✓</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link href="/contact" className="btn-outline-dark">Partner with us</Link>
                      <Link href="/donate" className="btn-primary">Support this work</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Your support keeps these programmes moving"
        description="Every contribution helps expand access to learning, health, opportunity, and local leadership across the communities we serve."
        primary={{ label: "Donate Now", href: "/donate" }}
        secondary={{ label: "Contact the Team", href: "/contact" }}
        image={heroContent.supportingVisuals[1]}
      />
    </div>
  );
}
