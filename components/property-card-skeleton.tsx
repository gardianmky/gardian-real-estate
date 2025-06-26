import { Skeleton } from "@/components/ui/skeleton";

export function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
      <Skeleton className="w-full h-48" />
      <div className="p-4 flex flex-col flex-grow space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-5 w-1/2" />
        <div className="flex gap-4 mt-auto">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
}