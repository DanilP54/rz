"use client";

import React from "react";
import { type Category } from "@/common/api/gen";
import dynamic from "next/dynamic";
import { CardItemSkeleton, CatalogSkeleton } from "./ui/skeleton.catalog";
import { PersonCard } from "./ui/cards/person-card.catalog";
import { DEFAULT_LIMIT } from "./query/query.options";
import { type BaseCardItemProps } from "./ui/cards/base-card.catalog";
import { CatalogGrid } from "./ui/grid.catalog";
import {
  catalog,
  catalogList,
  currentPage,
  fetchCatalog,
  hasMore,
  isFilterRefreshing,
  isNextPageLoading,
  isSkeletonLoading,
} from "./pagination.model";
import { categoryAtom } from "./path-params";
import { reatomComponent } from "@reatom/react";
import { wrap } from "@reatom/core";
import { InfiniteLoader } from "./ui/infinite-loader.catalog";
import { useIntersection } from "./lib/use-intersection";

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
  
  const category = categoryAtom();
  const list = catalog();

  const canLoadMore = catalog.hasMore();

  const isFirstPending = catalog.fetchList.status().isFirstPending;
  const isPending = catalog.fetchList.status().isPending;
  const isRefetching = catalog.isRefetching();
  const isNextPageLoading = catalog.isNextPageLoading();
  const isFetching = catalog.fetchList.pending();

  const interRef = useIntersection(
    wrap(() => {
      if (canLoadMore && !isPending) {
        currentPage.next();
      }
    }),
    [canLoadMore, isPending]
  );

  if (isFirstPending) {
    return <CatalogSkeleton itemsLength={DEFAULT_LIMIT} />;
  }

  if (list.length === 0 && !isPending) {
    return <EmptyCatalog />;
  }

  const MediaCardComponent = MEDIA_CARDS[category];

  return (
    <>
      {/*   */}
    </>
  );
});

function EmptyCatalog() {
  return <div className="text-center text-gray-500 p-9">No items found</div>;
}
