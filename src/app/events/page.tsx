import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllData } from "@/lib/api";

export const metadata: Metadata = {
  title: "Events | ANNT NANDAS FOUNDATION",
  description: "Join upcoming community, sports, health, education, and environmental initiatives across Uttarakhand.",
  alternates: { canonical: "/events" },
};
import { CTASection, PageHero, SectionHeading } from "@/components/site/SectionBlocks";

export default async function EventsPage() {
  const data = await getAllData();
  const { heroContent, upcomingEvents } = data;

  return (
    <div className="pb-8">
      <PageHero
        eyebrow="Events"
        title="Join the next wave of action"
        description="Our events bring people together through participation, service, learning, health outreach, and community-building experiences."
        image={heroContent.supportingVisuals[0]}
        actions={[
          { label: "Register for Events", href: "/general-registration" },
          { label: "Volunteer With Us", href: "/volunteer-registration", variant: "secondary" },
        ]}
      />

      <section className="section-padding px-3 sm:px-5">
        <div className="container-premium">
          <SectionHeading
            eyebrow="Upcoming Events"
            title="Be part of our next initiatives"
            description="Every event is designed to create connection, participation, and positive momentum in and around the communities we serve."
            centered
          />
          <div className="grid gap-5 xl:grid-cols-2">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="surface-card overflow-hidden">
                <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-[280px]">
                    <Image src={event.image} alt={event.title} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
                  </div>
                  <div className="p-6 sm:p-8">
                    <div className="mb-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                      <span>{event.type}</span>
                      <span className="text-slate-300">•</span>
                      <span>{event.date}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-950">{event.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{event.description}</p>
                    <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                      <div className="rounded-2xl bg-slate-50 p-4">📍 {event.location}</div>
                      <div className="rounded-2xl bg-slate-50 p-4">🕒 {event.time}</div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link href={event.href} className="btn-primary">Register now</Link>
                      <Link href="/contact" className="btn-outline-dark">Ask a question</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Bring your energy to the movement"
        description="Take part in upcoming events as a runner, supporter, learner, volunteer, or community partner."
        primary={{ label: "General Registration", href: "/general-registration" }}
        secondary={{ label: "Volunteer Registration", href: "/volunteer-registration" }}
        image={heroContent.supportingVisuals[1]}
      />
    </div>
  );
}
