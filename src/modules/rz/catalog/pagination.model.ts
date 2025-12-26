import {
  action,
  atom,
  computed,
  isInit,
  withAsyncData,
  withComputed,
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

export const page = atom(1).extend(
  withComputed((state) => {
    catalogFilters();
    return isInit() ? state : 1;
  })
);

const hasMore = atom(true);

const next = () => page.set(page() + 1);

const isRefetchingFilters = computed(() => {
  return !fetchCatalog.ready() && list.length === 1;
});

const isFetchingNextPage = computed(() => {
  return !fetchCatalog.ready() && page() > 1;
});

const list = atom<CatalogItem[]>([]);

const fetchCatalog = action(async () => {
  const currentPage = page();
  const filters = catalogFilters();
  const segment = segmentAtom();
  const category = categoryAtom();

  if (!category) return;

  const response = await wrap(
    getCatalog(category, {
      segment,
      page: currentPage,
      limit: 30,
      ...filters,
    })
  );

  if (currentPage === 1) {
    list.set(response.items);
  } else {
    list.set([...list(), ...response.items]);
  }

  hasMore.set(response.meta.hasNextPage);
}).extend(withAsyncData({ status: true }));

export {
  list,
  fetchCatalog,
  hasMore,
  isFetchingNextPage,
  isRefetchingFilters,
  next,
};
