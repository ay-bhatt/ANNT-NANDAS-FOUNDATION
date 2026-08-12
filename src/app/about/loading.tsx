import { Skeleton } from "@/components/site/Skeleton";

export default function AboutLoading() {
  return (
    <div className="section-padding px-3 sm:px-5">
      <div className="container-premium">
        <Skeleton className="mb-4 h-5 w-32" />
        <Skeleton className="mb-6 h-10 w-3/4" />
        <Skeleton className="mb-8 h-6 w-2/3" />
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <Skeleton className="aspect-[4/3] w-full" />
        </div>
      </div>
    </div>
  );
}
