import {
  action,
  atom,
  computed,
  effect,
  isInit,
  withAsyncData,
  withComputed,
  withInit,
  wrap,
} from "@reatom/core";
import { getCatalog } from "./api/api.catalog";
import { categoryAtom, segmentAtom } from "./path-params";
import { CatalogItem, CatalogResponse } from "@/common/api/gen";
import { catalogFilters } from "./filters/model/search-params.model";

export let serverCatalogData: CatalogResponse | null = null;

export const initializeCatalog = (data: CatalogResponse) => {
  serverCatalogData = data;
};

export const currentPage = atom(1, "pageAtom").extend(
  withComputed((state) => {
    catalogFilters();
    return isInit() ? state : 1;
  }),
  (target) => ({
    next: () => target.set(target() + 1) 
  })
);

export const catalog = atom<CatalogItem[]>([]).extend((target) => {
  const fetchList = computed(async () => {
    const page = currentPage();
    const filters = catalogFilters();
    const segment = segmentAtom();
    const category = categoryAtom();

    if (!category) return;

    const response = await wrap(
      getCatalog(category, {
        segment,
        page,
        limit: 30,
        ...filters,
      })
    );

    if (page === 1) {
      target.set(response.items);
    } else {
      target.set([...target(), ...response.items]);
    }

    return response.items;
  }).extend(
    withAsyncData({ status: true }),
    withInit(async () => {
      return serverCatalogData?.items;
    })
  );

  const isRefetching = computed(() => {
    return fetchList.pending() && currentPage() === 1 && target.length > 0;
  });

  const isNextPageLoading = computed(() => {
    return fetchList.pending() && currentPage() > 1;
  });

  const hasMore = atom(true, "hasMore").extend(
    withInit(() => serverCatalogData?.meta.hasNextPage ?? true)
  );

  return { fetchList, isRefetching, isNextPageLoading, hasMore };
});


effect(() => {
  currentPage()
  console.log('EFFECT')
})
// export const isSkeletonLoading = computed(() => {
//   return fetchCatalog.pending() && catalogList().length === 0;
// }, "isSkeletonLoading");

// export const isFilterRefreshing = computed(() => {
//   return (
//     fetchCatalog.pending() && currentPage() === 1 && catalogList().length > 0
//   );
// }, "isFilterRefreshing");

// export const isNextPageLoading = computed(() => {
//   return fetchCatalog.pending() && currentPage() > 1;
// }, "isNextPageLoading");
