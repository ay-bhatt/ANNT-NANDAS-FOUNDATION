"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/site/SectionBlocks";
import type { VolunteerOpportunity } from "@/lib/types";

export default function VolunteerOpportunitiesSection({
  opportunities,
}: {
  opportunities: VolunteerOpportunity[];
}) {
  return (
    <section className="section-padding px-3 sm:px-5">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Volunteer Opportunities"
          title="There is a place for your skill"
          description="Opportunities are matched to the activity. Timing, location, food, and stay are arranged by the foundation according to each programme."
          centered
        />
        <div className="grid gap-4 md:grid-cols-3">
          {opportunities.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="surface-card p-6"
            >
              <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              <Link href={item.href} className="mt-5 inline-flex text-sm font-semibold text-blue-700 hover:text-emerald-700">
                Get involved →
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
