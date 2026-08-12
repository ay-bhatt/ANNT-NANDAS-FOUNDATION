import { Skeleton } from "@/components/site/Skeleton";

export default function DonateLoading() {
  return (
    <div className="section-padding px-3 sm:px-5">
      <div className="container-premium">
        <Skeleton className="mb-8 h-12 w-3/4" />
        <Skeleton className="mb-4 h-5 w-1/2" />
        <Skeleton className="mb-8 h-64 w-full" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
