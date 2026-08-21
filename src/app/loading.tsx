/**
 * Route-level loading UI.
 *
 * Next.js automatically shows this file while a route segment
 * (page, loading boundary, or nested layout) is being fetched
 * on the server.  Because `page.tsx` is now a Server Component that
 * calls `getAllData()`, this loading screen appears instantly on
 * client-side navigation and fades out once data arrives.
 *
 * The skeleton layout mirrors the homepage's section order so the
 * final paint feels natural (hero → features → about → story →
 * impact → events/testimonials → news/gallery → CTA).
 */

import {
  EventCardSkeleton,
  FeatureCardSkeleton,
  HeroSkeleton,
  NewsCardSkeleton,
  Skeleton,
  StatGridSkeleton,
  TestimonialSkeleton,
} from "@/components/site/Skeleton";

export default function Loading() {
  return (
    <div className="pb-8">
      {/* Hero */}
      <HeroSkeleton />

      {/* Mini Impact Stats (3-card bar under hero) */}
      <section className="section-padding px-3 sm:px-5">
        <div className="container-premium">
          <div className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-[24px] border border-white/15 bg-white/10 p-5 text-center"
              >
                <Skeleton className="mb-2 h-3 w-16 mx-auto rounded-full bg-white/20" />
                <Skeleton className="h-8 w-20 mx-auto bg-slate-700" />
                <Skeleton className="mt-1 h-4 w-24 mx-auto bg-slate-700/50" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards (3) */}
      <section className="section-padding px-3 sm:px-5">
        <div className="container-premium">
          <Skeleton className="mb-12 h-12 w-64 rounded" />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <FeatureCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* About / Founder Quote + Stats */}
      <section className="section-padding bg-slate-50 px-3 sm:px-5">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Skeleton className="mb-4 h-10 w-48 rounded" />
            <Skeleton className="mb-2 h-8 w-full" />
            <Skeleton className="mb-4 h-8 w-3/4" />
            <Skeleton className="mt-6 h-64 w-full max-w-md rounded-[28px]" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
            <div className="sm:col-span-2">
              <Skeleton className="aspect-[4/3] w-full rounded-[28px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Founder achievements */}
      <section className="section-padding bg-white px-3 sm:px-5">
        <div className="container-premium">
          <Skeleton className="mb-4 h-10 w-64 rounded" />
          <Skeleton className="mb-10 h-8 w-3/4 max-w-xl" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[16/10] w-full rounded-[28px]" />
            ))}
          </div>
        </div>
      </section>

      {/* Story + Journey */}
      <section className="section-padding px-3 sm:px-5">
        <div className="container-premium grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <Skeleton className="mb-4 h-10 w-48 rounded" />
            <Skeleton className="mb-2 h-8 w-full" />
            <Skeleton className="mb-4 h-8 w-3/4" />
            <div className="mt-6 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full" />
            ))}
          </div>
        </div>
      </section>

      {/* Our Impact (Dark StatGrid) */}
      <section className="section-padding bg-slate-950 px-3 text-white sm:px-5">
        <div className="container-premium">
          <Skeleton className="mb-12 h-10 w-64 mx-auto rounded" />
          <StatGridSkeleton count={6} dark />
        </div>
      </section>

      {/* Events */}
      <section className="section-padding px-3 sm:px-5">
        <div className="container-premium">
          <Skeleton className="mb-10 h-10 w-56 mx-auto rounded" />
          <div className="grid gap-5 xl:grid-cols-2">
            <EventCardSkeleton />
            <EventCardSkeleton />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-slate-50 px-3 sm:px-5">
        <div className="container-premium">
          <Skeleton className="mb-10 h-10 w-64 mx-auto rounded" />
          <div className="grid gap-8 md:grid-cols-3">
            <TestimonialSkeleton />
            <TestimonialSkeleton />
            <TestimonialSkeleton />
          </div>
        </div>
      </section>

      {/* News + Gallery */}
      <section className="section-padding bg-white/70 px-3 sm:px-5">
        <div className="container-premium">
          <div className="grid gap-10 xl:grid-cols-[0.95fr_1.05fr]">
            <div>
              <Skeleton className="mb-8 h-10 w-56" />
              <div className="space-y-4">
                <NewsCardSkeleton />
                <NewsCardSkeleton />
                <NewsCardSkeleton />
              </div>
            </div>
            <div>
              <Skeleton className="mb-8 h-10 w-32" />
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <Skeleton className="section-padding h-80 w-full rounded-[32px] bg-slate-950" />
    </div>
  );
}
