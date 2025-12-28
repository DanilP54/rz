// "use client";

// import React from "react";
// import { Spinner } from "@/common/components/ui/spinner";
// import { type Category } from "@/common/api/gen";
// import dynamic from "next/dynamic";
// import { CardItemSkeleton, CatalogSkeleton } from "./ui/skeleton.catalog";
// import { PersonCard } from "./ui/cards/person-card.catalog";
// import { DEFAULT_LIMIT, getInfinityQueryOptions } from "./query/query.options";
// import { type BaseCardItemProps } from "./ui/cards/base-card.catalog";
// import { CatalogGrid } from "./ui/grid.catalog";
// import { useIntersection } from "./lib/use-intersection";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { reatomComponent } from "@reatom/react";
// import { catalogFilters } from "./filters";
// import { categoryPageParam, segmentPageParam } from "./page-params.store";

// const MovieCardItem = dynamic(() => import("./ui/cards/movie-card.catalog"), {
//   loading: () => <CardItemSkeleton />,
// });

// const MEDIA_CARDS: Record<Category, React.ComponentType<BaseCardItemProps>> = {
//   movies: MovieCardItem,
//   music: MovieCardItem,
//   books: MovieCardItem,
//   art: MovieCardItem,
// };

// export const InfiniteFeedCatalog = reatomComponent(() => {
//   const category = categoryPageParam();
//   const segment = segmentPageParam();
//   const filters = catalogFilters();

//   const {
//     data,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//     fetchNextPage,
//     isPlaceholderData,
//   } = useInfiniteQuery({
//     ...getInfinityQueryOptions(category, {
//       segment,
//       ...filters,
//     }),
//     select: ({ pages }) => pages.flatMap((page) => page.items),
//     placeholderData: (prev) => prev,
//   });

//   const interRef = useIntersection(() => {
//     if (hasNextPage && !isFetchingNextPage) {
//       fetchNextPage();
//     }
//   }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

//   if (isLoading) {
//     return <CatalogSkeleton itemsLength={DEFAULT_LIMIT} />;
//   }

//   if (!data || data?.length === 0) {
//     return <EmptyCatalog />;
//   }

//   const MediaCardComponent = MEDIA_CARDS[category];

//   return (
//     <>
//       <CatalogGrid
//         className={`${isPlaceholderData && "opacity-50 pointer-events-none"}`}
//       >
//         {data.map((item) => (
//           <React.Fragment key={item.id}>
//             {item.type === "media" && (
//               <MediaCardComponent
//                 title={item.title}
//                 subtitle={item.subtitle}
//                 coverUrl={item.coverUrl}
//                 slug={item.metadata.slug}
//               />
//             )}
//             {item.type === "person" && (
//               <PersonCard
//                 title={item.title}
//                 subtitle={item.subtitle}
//                 coverUrl={item.coverUrl}
//                 slug={item.metadata.slug}
//               />
//             )}
//           </React.Fragment>
//         ))}
//       </CatalogGrid>
//       {hasNextPage && (
//         <InfiniteLoader ref={interRef} isFetching={isFetchingNextPage} />
//       )}
//     </>
//   );
// });

// export function InfiniteLoader({
//   isFetching,
//   ...props
// }: { isFetching: boolean } & React.ComponentProps<"div">) {
//   return (
//     <div
//       {...props}
//       className="w-full col-span-full flex items-center justify-center min-h-12 border"
//     >
//       {isFetching && <Spinner className="size-5" />}
//     </div>
//   );
// }

// function EmptyCatalog() {
//   return <div className="text-center text-gray-500 p-9">No items found</div>;
// }

"use client";

import React from "react";
import { Spinner } from "@/common/components/ui/spinner";
import { type Category } from "@/common/api/gen";
import dynamic from "next/dynamic";
import { CardItemSkeleton, CatalogSkeleton } from "./ui/skeleton.catalog";
import { PersonCard } from "./ui/cards/person-card.catalog";
import { DEFAULT_LIMIT } from "./query/query.options";
import { type BaseCardItemProps } from "./ui/cards/base-card.catalog";
import { CatalogGrid } from "./ui/grid.catalog";
import { useIntersection } from "./lib/use-intersection";
import { reatomComponent } from "@reatom/react";
import { categoryPageParam } from "./page-params.store";
import { catalogInfiniteQuery } from "./model/pagination.model";
import { wrap } from "@reatom/core";

const MovieCardItem = dynamic(() => import("./ui/cards/movie-card.catalog"), {
  loading: () => <CardItemSkeleton />,
});

const MEDIA_CARDS: Record<Category, React.ComponentType<BaseCardItemProps>> = {
  movies: MovieCardItem,
  music: MovieCardItem,
  books: MovieCardItem,
  art: MovieCardItem,
};

export const InfiniteFeedCatalog = reatomComponent(() => {
  const category = categoryPageParam();

  const {
    data,
    isLoading,
    loadNextFn,
    isFirstLoadingAtom,
    isFetchingNextPage,
    hasMore,
  } = catalogInfiniteQuery();

  const interRef = useIntersection(
    wrap(() => {
      loadNextFn();
    }),
    []
  );

  if (isFirstLoadingAtom()) {
    return <CatalogSkeleton itemsLength={DEFAULT_LIMIT} />;
  }

  if (!data() || data().length === 0) {
    return <EmptyCatalog />;
  }

  const MediaCardComponent = MEDIA_CARDS[category];

  return (
    <>
      <CatalogGrid
        className={`${
          isLoading() &&
          !isFetchingNextPage() &&
          "opacity-50 pointer-events-none"
        }`}
      >
        {data().map((item) => (
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
        <InfiniteLoader ref={interRef} isFetching={isFetchingNextPage()} />
      )}
    </>
  );
});

export function InfiniteLoader({
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
