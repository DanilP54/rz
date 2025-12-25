import { Category, GetCatalogQueryParams, Segment } from "@/common/api/gen";
import { infiniteQueryOptions } from "@tanstack/react-query";
import { getCatalog } from "../api/api.catalog";
import type { SearchParamsCatalog } from "../filters";

export const DEFAULT_LIMIT = 30;
// params: SearchParamsCatalog & Pick<GetCatalogQueryParams, 'segment'>

export function getInfinityQueryOptions(
  category: Category,
  params: GetCatalogQueryParams
) {
  // const normalizedParams = normalizeParams(params)
  return infiniteQueryOptions({
    queryKey: ["catalog", category, params],
    queryFn: ({ pageParam, signal }) => {
      return getCatalog(
        category,
        {
          ...params,
          page: pageParam as number,
          limit: DEFAULT_LIMIT,
        },
        { signal }
      );
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.meta.hasNextPage) {
        return undefined;
      }
      return lastPage.meta.currentPage + 1;
    },
  });
}


export function normalizeParams(
  obj: Partial<SearchParamsCatalog> & Pick<GetCatalogQueryParams, 'segment'>
): GetCatalogQueryParams {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === null ? undefined : value,
    ])
  );
}

