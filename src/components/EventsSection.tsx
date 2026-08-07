"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { upcomingEvents } from "@/lib/data";
import event01 from "@/assets/events/event (1).jpeg";
import event02 from "@/assets/events/event (2).jpeg";
import event03 from "@/assets/events/event (3).jpeg";

export default function EventsSection() {
  const events = upcomingEvents.slice(0, 3);
  const eventImages = [event01, event02, event03];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary-500 font-semibold text-sm tracking-wider uppercase mb-3 font-inter">
            Events
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 leading-tight">
            Upcoming{" "}
            <span className="text-primary-500">Events</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto font-inter">
            Join us in making a difference through our upcoming events and programs.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Image */}
              <div className="md:w-56 flex-shrink-0">
                <div className="relative h-48 md:h-full overflow-hidden">
                  <Image src={eventImages[i]} alt={event.title} fill className="object-cover" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-semibold">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {event.date}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-50 text-gray-500 text-xs">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {event.location}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-poppins text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-inter">{event.description}</p>
                </div>
                <div className="mt-4">
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-all duration-200"
                  >
                    Register Now
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-all duration-300 shadow-sm"
          >
            View All Events
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}