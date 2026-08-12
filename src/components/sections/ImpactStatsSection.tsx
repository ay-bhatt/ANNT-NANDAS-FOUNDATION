"use client";

/**
 * Home impact stats (dark variant) — Client Component.
 * Renders a full-width dark section with the complete impact stat grid.
 *
 * Data is passed as props; no direct imports from lib/data.
 */

import { motion } from "framer-motion";
import { SectionHeading, StatGrid } from "@/components/site/SectionBlocks";
import type { ImpactStat } from "@/lib/types";

interface ImpactStatsSectionProps {
  impactStats: ImpactStat[];
}

export default function ImpactStatsSection({ impactStats }: ImpactStatsSectionProps) {
  return (
    <section className="section-padding bg-slate-950 px-3 text-white sm:px-5">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            eyebrow="Our Impact"
            title="Numbers that inspire change"
            description="From village connection to youth support, these numbers reflect the scale of our work and the momentum behind it."
            dark
          />
        </motion.div>
        <StatGrid stats={impactStats} dark />
      </div>
    </section>
  );
}
