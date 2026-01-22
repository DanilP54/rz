"use client";

import React from "react";
import { Spinner } from "@/common/components/ui/spinner";
import dynamic from "next/dynamic";
import { CardItemSkeleton, CatalogSkeleton } from "./ui/skeleton.catalog";
import { PersonCard } from "./ui/cards/person-card.catalog";
import { type BaseCardItemProps } from "./ui/cards/base-card.catalog";
import { CatalogGrid } from "./ui/grid.catalog";
import { useIntersection } from "./lib/use-intersection";
import { categoryPageParam } from "./page-params.store";
import { Category } from "@/client";

const MovieCardItem = dynamic(() => import("./ui/cards/movie-card.catalog"), {
  loading: () => <CardItemSkeleton />,
});

const MEDIA_CARDS: Record<Category, React.ComponentType<BaseCardItemProps>> = {
  movies: MovieCardItem,
  music: MovieCardItem,
  books: MovieCardItem,
  art: MovieCardItem,
};

export const InfiniteFeedCatalog = () => {
  const category = categoryPageParam();

  const interRef = useIntersection(wrap(() => loadList()));
 
  if (isFirstFetching()) {
    return <CatalogSkeleton itemsLength={30} />;
  }

  if (!list() || list().length === 0) {
    return <EmptyCatalog />;
  }

  const MediaCardComponent = MEDIA_CARDS[category];

  return (
    <>
      <CatalogGrid
        className={`${
          isFetching() &&
          !isFetchingNextPage() &&
          "opacity-50 pointer-events-none"
        }`}
      >
        {list().map((item) => (
          <React.Fragment key={item.id}>
            {item.type === "media" && (
              <MediaCardComponent
                title={item.title}
                subtitle={item.subtitle}
                coverUrl={item.coverUrl}
                slug={item.metadata.slug}
              />
            )}
            {item.type === "person" && (
              <PersonCard
                title={item.title}
                subtitle={item.subtitle}
                coverUrl={item.coverUrl}
                slug={item.metadata.slug}
              />
            )}
          </React.Fragment>
        ))}
      </CatalogGrid>
      {hasMore() && (
        <InfiniteTrigger 
          ref={interRef} 
          isFetching={isFetchingNextPage()} 
        />
      )}
    </>
  );
};

export function InfiniteTrigger({
  isFetching,
  ...props
}: { isFetching: boolean } & React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className="w-full col-span-full flex items-center justify-center min-h-12"
    >
      {isFetching && <Spinner className="size-5" />}
    </div>
  );
}

function EmptyCatalog() {
  return <div className="text-center text-gray-500 p-9">No items found</div>;
}
