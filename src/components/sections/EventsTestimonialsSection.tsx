import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/site/SectionBlocks";
import type { UpcomingEvent, Testimonial } from "@/lib/types";

interface EventsTestimonialsSectionProps {
  upcomingEvents: UpcomingEvent[];
  testimonials: Testimonial[];
}

export default function EventsTestimonialsSection({
  upcomingEvents,
  testimonials,
}: EventsTestimonialsSectionProps) {
  return (
    <section className="section-padding px-3 sm:px-5">
      <div className="container-premium grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <SectionHeading eyebrow="Upcoming Events" title="Be part of our next initiatives" />
          <div className="-mx-3 flex snap-x snap-mandatory gap-4 overflow-x-auto px-3 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0">
            {upcomingEvents.slice(0, 2).map((event) => (
              <article key={event.title} className="surface-card min-w-[86%] snap-center overflow-hidden min-[430px]:min-w-[72%] md:min-w-0">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 767px) 86vw, (max-width: 1023px) 50vw, 28vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">{event.date}</p>
                  <h3 className="mt-3 text-lg font-semibold text-slate-950">{event.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {event.location} · {event.time}
                  </p>
                  <Link
                    href={event.href}
                    className="mt-5 inline-flex rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    Register for {event.title}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="Voices of Change" title="Stories of hope and transformation" />
          <div className="space-y-4">
            {testimonials.map((item) => (
              <article key={item.name} className="surface-card p-6">
                <p className="text-lg leading-8 text-slate-700">“{item.content}”</p>
                <div className="mt-5 flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full">
                    <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-950">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
