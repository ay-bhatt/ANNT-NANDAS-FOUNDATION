/**
 * Skeleton loader primitives.
 *
 * These are used inside `app/loading.tsx` (route-level) and can also be
 * embedded directly in components for inline loading states.
 *
 * The animation uses Tailwind's built-in `animate-pulse` and a custom
 * `shimmer` keyframe defined in `tailwind.config.js`.
 */

import { cn } from "@/lib/utils";

// ── Basic shapes ──────────────────────────────────────────

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-slate-200/60",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent",
        "before:animate-[shimmer_1.8s_ease-in-out_infinite]",
        "before:absolute before:inset-0 before:-z-10",
        className,
      )}
    />
  );
}

export function SkeletonText({
  lines = 1,
  className,
}: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4 bg-slate-200/60",
            i === lines - 1 && lines > 1 ? "w-3/4" : "w-full",
          )}
        />
      ))}
    </div>
  );
}

// ── Section-specific skeletons ────────────────────────────

export function HeroSkeleton() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-slate-950 px-3 py-16 text-white flex items-center justify-center sm:px-5 lg:py-24">
      <div className="absolute inset-0 z-0">
        <Skeleton className="absolute inset-0 bg-slate-700" />
        <div className="absolute inset-0 bg-black/85" />
      </div>
      <div className="container-premium relative z-10 max-w-4xl text-center">
        <Skeleton className="mb-6 h-8 w-56 rounded-full mx-auto" />
        <Skeleton className="mb-6 h-16 sm:h-20 w-full max-w-2xl mx-auto rounded-lg" />
        <SkeletonText lines={3} className="mb-10 max-w-2xl mx-auto" />
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Skeleton className="h-14 w-48 rounded-full" />
          <Skeleton className="h-14 w-48 rounded-full" />
        </div>
      </div>
    </section>
  );
}

export function StatCardSkeleton({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={
        dark
          ? "rounded-[24px] border border-white/10 bg-white/5 p-5"
          : "surface-card p-5"
      }
    >
      <Skeleton className={`mb-3 h-12 w-12 rounded-2xl ${dark ? "bg-white/10" : "bg-emerald-50"}`} />
      <Skeleton className={`h-8 w-3/4 ${dark ? "bg-slate-700" : "bg-slate-200/60"}`} />
      <Skeleton className={`mt-2 h-5 w-1/2 ${dark ? "bg-slate-700/40" : "bg-slate-200/60"}`} />
    </div>
  );
}

export function StatGridSkeleton({ count = 3, dark = false }: { count?: number; dark?: boolean }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <StatCardSkeleton key={i} dark={dark} />
      ))}
    </div>
  );
}

export function FeatureCardSkeleton() {
  return (
    <div className="surface-card overflow-hidden">
      <Skeleton className="aspect-[16/10] w-full" />
      <div className="p-6">
        <Skeleton className="mb-3 h-6 w-6" />
        <Skeleton className="mb-3 h-7 w-3/4" />
        <SkeletonText lines={2} />
      </div>
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="mb-5 flex gap-1">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-5" />
      </div>
      <SkeletonText lines={3} className="mb-4" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div>
          <Skeleton className="h-5 w-24 mb-1" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

export function NewsCardSkeleton() {
  return (
    <article className="surface-card flex flex-col gap-4 overflow-hidden sm:flex-row">
      <Skeleton className="relative h-56 sm:h-auto sm:w-56 sm:shrink-0" />
      <div className="p-5 flex-1">
        <Skeleton className="h-6 w-20 rounded-full mb-3" />
        <Skeleton className="h-8 w-3/4 mb-3" />
        <SkeletonText lines={2} />
        <Skeleton className="mt-5 h-5 w-24" />
      </div>
    </article>
  );
}

export function EventCardSkeleton() {
  return (
    <div className="surface-card overflow-hidden">
      <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
        <Skeleton className="relative min-h-[280px]" />
        <div className="p-6 sm:p-8 flex-1">
          <Skeleton className="h-6 w-40 rounded-full mb-4" />
          <Skeleton className="h-8 w-3/4 mb-3" />
          <SkeletonText lines={2} className="mb-4" />
          <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ImageCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-[28px]">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <Skeleton className="h-5 w-3/4 mb-1 bg-white/30" />
        <Skeleton className="h-4 w-1/2 bg-white/20" />
      </div>
    </div>
  );
}