import { Skeleton } from "@/components/site/Skeleton";

export default function ContactLoading() {
  return (
    <div className="section-padding px-3 sm:px-5">
      <div className="container-premium">
        <Skeleton className="mb-8 h-12 w-3/4" />
        <Skeleton className="mb-4 h-5 w-1/2" />
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="pt-4 space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
          <Skeleton className="aspect-[4/3] w-full" />
        </div>
      </div>
    </div>
  );
}
