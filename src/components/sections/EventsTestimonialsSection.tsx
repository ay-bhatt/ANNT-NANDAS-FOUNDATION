"use client";

/**
 * Home events + testimonials section — Client Component.
 * Events stack with the comment form on the left so the column fills.
 * Testimonials stay on the right in a compact list.
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/site/SectionBlocks";
import CommentForm from "@/components/CommentForm";
import { StarRatingDisplay } from "@/components/StarRating";
import type { UpcomingEvent, Testimonial, CommunityComment } from "@/lib/types";

interface EventsTestimonialsSectionProps {
  upcomingEvents: UpcomingEvent[];
  testimonials: Testimonial[];
}

export default function EventsTestimonialsSection({
  upcomingEvents,
  testimonials,
}: EventsTestimonialsSectionProps) {
  const [communityComments, setCommunityComments] = useState<CommunityComment[]>([]);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/comments")
      .then((response) => response.json())
      .then((result: { success?: boolean; comments?: CommunityComment[] }) => {
        if (!cancelled && result.success && Array.isArray(result.comments)) {
          setCommunityComments(result.comments);
        }
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="home-events" className="section-padding anchor-offset px-3 sm:px-5">
      <div className="container-premium grid gap-8 lg:grid-cols-2 lg:items-stretch">
        <div className="flex flex-col">
          <SectionHeading
            eyebrow="Upcoming Events"
            title="Be part of our next initiatives"
          />
          <div className="flex flex-1 flex-col gap-4">
            {upcomingEvents.slice(0, 3).map((event, index) => (
              <motion.article
                key={event.title}
                className="surface-card overflow-hidden"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="flex flex-col min-[480px]:flex-row">
                  <div className="relative h-44 min-[480px]:h-auto min-[480px]:w-40 min-[480px]:shrink-0 lg:w-44">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 479px) 100vw, 176px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-4 sm:p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                      {event.date}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-950">{event.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {event.location} · {event.time}
                    </p>
                    <Link
                      href={event.href}
                      className="mt-4 inline-flex w-fit rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                      Register now
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}

            <div className="surface-card mt-auto p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-slate-950">Leave a comment</h3>
              <p className="mt-2 mb-5 text-sm leading-6 text-slate-600">
                Share your experience and rate your interaction with the foundation.
              </p>
              <CommentForm
                onSubmitted={(comment) => {
                  setCommunityComments((current) => [comment, ...current]);
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <SectionHeading
            eyebrow="Voices of Change"
            title="Stories of hope and transformation"
          />
          <div className="grid flex-1 content-start gap-4">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.name}
                className="surface-card p-5"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <StarRatingDisplay value={item.rating} />
                <p className="mt-3 text-base leading-7 text-slate-700">“{item.content}”</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-950">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            {communityComments.map((item) => (
              <motion.div
                key={item.id}
                className="surface-card p-5"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <StarRatingDisplay value={item.rating} />
                <p className="mt-3 text-base leading-7 text-slate-700">“{item.content}”</p>
                <div className="mt-4">
                  <p className="font-semibold text-slate-950">{item.name}</p>
                  <p className="text-sm text-slate-500">Community comment</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
