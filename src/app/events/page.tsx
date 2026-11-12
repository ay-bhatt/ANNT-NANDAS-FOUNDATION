import type { Metadata } from "next";
import { getAllData } from "@/lib/api";

export const metadata: Metadata = {
  title: "Events | ANNT NANDAS FOUNDATION",
  description: "Explore upcoming and planned community, ultra trail running, and talent hunt initiatives across Uttarakhand.",
  alternates: { canonical: "/events" },
};
import { CTASection, PageHero, SectionHeading } from "@/components/site/SectionBlocks";
import UpcomingEventCards from "@/components/events/UpcomingEventCards";

export default async function EventsPage() {
  const data = await getAllData();
  const { pageVisuals, upcomingEvents } = data;

  return (
    <div className="pb-8">
      <PageHero
        eyebrow="Events"
        title="Join the next wave of action"
        description="Our events bring people together through participation, service, learning, sports, and community-building experiences."
        image={pageVisuals.eventsHero}
        actions={[
          { label: "Register for Programs", href: "/register" },
          { label: "Volunteer With Us", href: "/volunteer-registration", variant: "secondary" },
        ]}
      />

      <section className="section-padding px-3 sm:px-5">
        <div className="container-premium">
          <SectionHeading
            eyebrow="Upcoming Events"
            title="Be part of our next initiatives"
            description="Explore our planned upcoming events. Exact dates and registration announcements will be updated as schedules are finalised."
            centered
          />
          <UpcomingEventCards events={upcomingEvents} variant="grid" />
        </div>
      </section>

      <CTASection
        title="Bring your energy to the movement"
        description="Take part in foundation programmes as a runner, supporter, learner, volunteer, or community partner."
        primary={{ label: "General Registration", href: "/general-registration" }}
        secondary={{ label: "Volunteer Registration", href: "/volunteer-registration" }}
        image={pageVisuals.eventsCta}
      />
    </div>
  );
}
