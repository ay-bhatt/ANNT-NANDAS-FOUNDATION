import { Skeleton } from "@/components/site/Skeleton";

export default function ProgramsLoading() {
  return (
    <div className="section-padding px-3 sm:px-5">
      <div className="container-premium">
        <Skeleton className="mb-8 h-12 w-3/4" />
        <Skeleton className="mb-4 h-5 w-1/2" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="surface-card p-6">
              <Skeleton className="mb-3 h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
