import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/site/SectionBlocks";
import type { FounderInfo } from "@/lib/types";

interface FounderAchievementsSectionProps {
  founderInfo: FounderInfo;
}

function honourFit(title: string) {
  if (title.includes("GOC")) return "object-contain p-3";
  if (title.includes("Ultra Trail")) return "object-cover object-top";
  return "object-cover object-center";
}

export default function FounderAchievementsSection({ founderInfo }: FounderAchievementsSectionProps) {
  const [featured, ...rest] = founderInfo.honours;
  const hajar = rest.find((item) => item.title.includes("Hajar"));
  const others = rest.filter((item) => item !== hajar);

  return (
    <section
      id="founder-achievements"
      aria-label="Kalam Singh Bisht – Achievements"
      className="section-padding scroll-mt-24 bg-white px-3 sm:px-5"
    >
      <div className="container-premium">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="min-w-0">
            <SectionHeading
              eyebrow="Founder"
              title="Kalam Singh Bisht – Achievements"
              description={`${founderInfo.name} is an ex-serviceman of 4th Battalion, The Garhwal Rifles, an international ultra trail runner, and the founder of ANNT NANDAS FOUNDATION.`}
            />
            <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              From military service to Himalayan community work and international endurance racing, his journey is built on discipline, duty, and the belief that hidden talent deserves a fair chance.
            </p>
            <Link href="/about" className="btn-outline-dark mt-6">
              Read his full story
            </Link>
          </div>

          <div className="grid min-w-0 gap-4 sm:grid-cols-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] bg-slate-100 shadow-[0_14px_40px_rgba(15,23,42,0.10)]">
              <Image
                src={founderInfo.portraitImage}
                alt={`${founderInfo.name}, founder of ANNT NANDAS FOUNDATION, in uniform`}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 28vw"
                className="object-cover object-top"
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] bg-slate-100 shadow-[0_14px_40px_rgba(15,23,42,0.10)]">
              <Image
                src={founderInfo.medalsImage}
                alt={`${founderInfo.name} wearing international ultra running medals`}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 28vw"
                className="object-cover object-top"
              />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-slate-100 shadow-[0_14px_40px_rgba(15,23,42,0.10)] sm:col-span-2">
              <Image
                src={founderInfo.image}
                alt={`${founderInfo.name} running as an international ultra trail athlete`}
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featured ? (
            <article className="surface-card min-w-0 overflow-hidden sm:col-span-2 xl:col-span-1">
              <div className="relative aspect-[16/10] bg-slate-100">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                  {featured.category}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-950">{featured.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{featured.description}</p>
              </div>
            </article>
          ) : null}

          {others.map((honour) => (
            <article key={honour.title} className="surface-card min-w-0 overflow-hidden">
              <div className={`relative bg-slate-50 ${honour.title.includes("GOC") ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
                <Image
                  src={honour.image}
                  alt={honour.title}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
                  className={honourFit(honour.title)}
                />
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                  {honour.category}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-950">{honour.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{honour.description}</p>
              </div>
            </article>
          ))}

          {hajar ? (
            <article className="surface-card min-w-0 overflow-hidden sm:col-span-2">
              <div className="grid sm:grid-cols-2">
                <div className="relative aspect-[16/10] sm:aspect-auto sm:min-h-[260px]">
                  <Image
                    src={hajar.image}
                    alt={hajar.title}
                    fill
                    sizes="(max-width: 639px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-col justify-center p-5 sm:p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                    {hajar.category}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-950 sm:text-2xl">{hajar.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">{hajar.description}</p>
                </div>
              </div>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
}
