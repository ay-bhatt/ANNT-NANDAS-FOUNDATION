import { SectionHeading, StatGrid } from "@/components/site/SectionBlocks";
import type { ImpactStat } from "@/lib/types";

interface ImpactStatsSectionProps {
  impactStats: ImpactStat[];
}

export default function ImpactStatsSection({ impactStats }: ImpactStatsSectionProps) {
  return (
    <section id="impact" className="section-padding scroll-mt-24 bg-slate-950 px-3 text-white sm:px-5">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Our Impact"
          title="Numbers that inspire change"
          description="From village connection to youth support, these numbers reflect the scale of our work and the momentum behind it."
          dark
        />
        <StatGrid stats={impactStats} dark />
      </div>
    </section>
  );
}
