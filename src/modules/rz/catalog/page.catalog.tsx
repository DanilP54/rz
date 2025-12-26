import { FiltersBar, getCatalogFiltersOptions } from "./filters";
import { CatalogPageHydrator } from "./catalog-hydrator";
import { Mode, Topic, category, getCatalog } from "@/common/api/gen";
import { InfiniteFeedCatalog } from "./infinite-feed.catalog";
import { getQueryClient } from "@/common/api/get-query-client";
import { getInfinityQueryOptions } from "./query/query.options";
import type { CatalogPageProps } from "./type";

export async function PageCatalog(props: CatalogPageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery({
    ...getInfinityQueryOptions(params.category, {
      segment: params.segment,
      ...searchParams,
    }),
  });

  const options = getCatalogFiltersOptions(params.segment, params.category);

  return (
    <CatalogPageHydrator params={params} searchParams={searchParams}>
      <div
        id={"page"}
        data-segment={params.segment}
        data-hassegment={String(Boolean(params.segment))}
      >
        <div className="mx-4">
          <FiltersBar
            options={options}
            segment={params.segment}
            isMobileDevice={true}
          />
          <InfiniteFeedCatalog />
        </div>
      </div>
    </CatalogPageHydrator>
  );
}
