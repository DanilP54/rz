import {
  action,
  atom,
  computed,
  memoKey,
  sleep,
  wrap,
} from "@reatom/core";
import { catalogFilters } from "../filters";
import { categoryPageParam, segmentPageParam } from "../page-params.store";
import { getCatalog } from "@/client/sdk.gen";

import type { CatalogItem } from "@/client";

const list = atom<CatalogItem[]>([], "catalog.list");
const isFirstFetching = atom(true, "catalog.isFirstLoad");

export const ciq = computed(() => {
  const filters = catalogFilters();
  const segment = segmentPageParam();
  const category = categoryPageParam();

  const key = JSON.stringify(
    Object.entries({ category, segment, ...filters }).sort(([k1], [k2]) =>
      k1.localeCompare(k2),
    ),
  );

  const result = memoKey(key, () => {
    const cacheData = atom<CatalogItem[]>([], "catalog.cache");
    const hasMore = atom(true, "catalog.hasMore");
    const isFetchingNextPage = atom(false, "catalog.isFetchNextPage");
    const isFetching = atom(false, "catalog.isFetching");
    const page = atom(1, "catalog.page");

    const loadList = action(async () => {
      if (!hasMore()) return;

      isFetching.set(true);

      if (cacheData().length > 0) {
        isFetchingNextPage.set(true);
      }

      try {
        await wrap(sleep(3000));
        const { data, error } = await wrap(getCatalog({
          path: { category },
          query: {
            ...filters,
            segment,
            page: page(),
            limit: 30
          }
        }));
        console.log(data, error)
        if (error) {
          throw new Error(error.message);
        }

        const { items, meta } = data;

        cacheData.set([...cacheData(), ...items]);

        hasMore.set(meta.hasNextPage);

        if (hasMore()) {
          page.set(page() + 1);
        }
      } finally {
        isFetchingNextPage.set(false);
        isFetching.set(false);
        isFirstFetching.set(false);
      }
    });

    loadList();

    return {
      cacheList: cacheData,
      isFetching,
      isFetchingNextPage,
      hasMore,
      loadList,
    };
  });

  if (!result.isFetching()) {
    list.set(result.cacheList());
  }

  return {
    list,
    isFirstFetching,
    ...result,
  };
});