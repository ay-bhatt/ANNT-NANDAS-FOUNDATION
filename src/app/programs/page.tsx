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
        title="Comprehensive development, deeply rooted in community"
        description="Our programmes are designed to discover potential, strengthen opportunity, and support long-term self-reliance across Himalayan communities."
        image={heroContent.supportingVisuals[0]}
        actions={[
          { label: "Support Our Programs", href: "/donate" },
          { label: "Join as Volunteer", href: "/volunteer-registration", variant: "secondary" },
        ]}
      />

      <section className="section-padding px-3 sm:px-5">
        <div className="container-premium">
          <SectionHeading
            eyebrow="Programme Areas"
            title="Focused initiatives for everyday change"
            description="Each programme area reflects a practical path to empowerment—through learning, health, participation, environment, and confidence."
            centered
          />
          <div className="space-y-8">
            {impactAreas.map((program, index) => (
              <div key={program.title} className="surface-card overflow-hidden">
                <div className={`grid gap-0 lg:grid-cols-2 ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="relative min-h-[320px] lg:min-h-full">
                    <Image src={program.image} alt={program.title} fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw" className="object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-tr ${program.color} opacity-20`} />
                  </div>
                  <div className="p-6 sm:p-8 lg:p-10">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-400/15 to-blue-500/15 text-3xl">
                        {program.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">{program.title}</h2>
                    </div>
                    <p className="text-base leading-8 text-slate-600">{program.description}</p>
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
