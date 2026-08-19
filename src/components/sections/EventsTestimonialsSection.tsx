"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
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
  const [story, setStory] = useState(0);

  useEffect(() => {
    if (testimonials.length < 2) return;
    const timer = window.setInterval(() => {
      setStory((current) => (current + 1) % testimonials.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [testimonials.length]);

  const active = testimonials[story] ?? testimonials[0];

  return (
    <section className="section-padding px-3 sm:px-5">
      <div className="container-premium grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <SectionHeading eyebrow="Upcoming Events" title="Be part of our next initiatives" />
          <div className="-mx-3 flex snap-x snap-mandatory gap-4 overflow-x-auto px-3 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0">
            {upcomingEvents.map((event, index) => (
              <motion.article
                key={event.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="surface-card min-w-[86%] snap-center overflow-hidden min-[430px]:min-w-[72%] md:min-w-0"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 767px) 86vw, (max-width: 1023px) 50vw, 28vw"
                    className="object-cover transition duration-700 hover:scale-105"
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
              </motion.article>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="Voices of Change" title="Stories of hope and transformation" />
          {active ? (
            <div className="surface-card min-h-[260px] p-6">
              <AnimatePresence mode="wait">
                <motion.article
                  key={active.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-lg leading-8 text-slate-700">“{active.content}”</p>
                  <div className="mt-5 flex items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full">
                      <Image src={active.image} alt={active.name} fill sizes="56px" className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-950">{active.name}</p>
                      <p className="text-sm text-slate-500">{active.role}</p>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
              <div className="mt-6 flex gap-2">
                {testimonials.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-label={`Show story from ${item.name}`}
                    onClick={() => setStory(index)}
                    className={`h-2.5 rounded-full transition ${index === story ? "w-8 bg-emerald-600" : "w-2.5 bg-slate-200"}`}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
