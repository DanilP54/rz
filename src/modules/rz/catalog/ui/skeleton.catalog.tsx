import { Skeleton } from "@/common/components/ui/skeleton";
import { CatalogGrid } from "./grid.catalog";

export function CatalogSkeleton({ itemsLength }: { itemsLength: number }) {
  return (
    <CatalogGrid>
      {Array.from({ length: itemsLength }).map((_, i) => (
        <CardItemSkeleton key={i} />
      ))}
    </CatalogGrid>
  );
}

export function CardItemSkeleton() {
  return (
    <div className="w-full h-full rounded-none border">
      <Skeleton className="w-full group aspect-video bg-gray-100 rounded-none" />
      <div className="flex flex-col gap-2 p-2">
        <Skeleton className="h-5 bg-gray-200 w-3/4 rounded-none" />
        <Skeleton className="h-5 bg-gray-200 w-1/2 rounded-none" />
      </div>
    </div>
  );
}
