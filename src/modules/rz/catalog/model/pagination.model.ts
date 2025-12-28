import { atom, computed, memoKey, wrap } from "@reatom/core";
import { catalogFilters } from "../filters";
import { categoryPageParam, segmentPageParam } from "../page-params.store";
import { CatalogItem } from "@/common/api/gen";
import { getCatalog } from "../api/api.catalog";

const catalogList = atom<CatalogItem[]>([], "catalog.data");
const isFirstLoadingAtom = atom(true, "catalog.isFirstLoad");

export const catalogInfiniteQuery = computed(() => {
  const filters = catalogFilters();
  const segment = segmentPageParam();
  const category = categoryPageParam();

  const key = JSON.stringify(
    Object.entries({ category, segment, ...filters }).sort(([k1], [k2]) =>
      k1.localeCompare(k2)
    )
  );

  const catalog = memoKey(key, () => {
    const cached = atom<CatalogItem[]>([], "catalog.data");
    const page = atom(1, "catalog.page");
    const hasMore = atom(true, "catalog.hasMore");
    const isLoading = atom(false, "catalog.isLoading");
    const isFetchingNextPage = atom(false, "catalog.isFetchNextPage");

    const loadNextFn = computed(async () => {
      if (isLoading() || !hasMore()) return;

      isLoading.set(true);

      if (cached().length !== 0) {
        isFetchingNextPage.set(true);
      }

      try {
        const response = await wrap(
          getCatalog(category, {
            segment,
            ...filters,
            page: page(),
            limit: 30,
          })
        );
        cached.set((prev) => [...prev, ...response.items]);
        page.set(page() + 1);
        hasMore.set(response.meta.hasNextPage);
      } catch (err) {
        console.error("Failed to load products:", err);
        throw err;
      } finally {
        isLoading.set(false);
        if (isFetchingNextPage()) {
          isFetchingNextPage.set(false);
        }
        if (isFirstLoadingAtom()) {
          isFirstLoadingAtom.set(false);
        }
      }
    }, "catalog.loadNext");

    loadNextFn();

    return {
      cached,
      loadNextFn,
      isLoading,
      isFetchingNextPage,
      hasMore: hasMore,
    };
  });

  if (!catalog.isLoading()) {
    catalogList.set(catalog.cached());
  }

  return {
    ...catalog,
    data: catalogList,
    isFirstLoadingAtom,
  };
});
