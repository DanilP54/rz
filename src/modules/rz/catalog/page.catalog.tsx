import { FiltersBar, getCatalogFiltersOptions } from "./filters";
import type { SearchParams } from "nuqs";
import { RzPathParamsProps } from "../types";
import { CatalogHydrator } from "./catalog-hydrator";
import { Mode, Topic, category, getCatalog } from "@/common/api/gen";
import { InfiniteFeedCatalog } from "./infinite-feed.catalog";

export interface PageCatalogProps {
  params: Promise<RzPathParamsProps>;
  searchParams: Promise<SearchParams>;
}

export async function PageCatalog(props: PageCatalogProps) {
  const params = await props.params;
  const searchParams: { topic?: Topic; mode?: Mode } = await props.searchParams;
  const options = getCatalogFiltersOptions(params.segment, params.category);

  const data = await getCatalog(params.category, {
    topic: searchParams.topic,
    mode: searchParams.mode,
    segment: params.segment,
    page: 1,
    limit: 30,
  });

  return (
    <div
      id={"page"}
      data-segment={params.segment}
      data-hassegment={String(Boolean(params.segment))}
    >
      <CatalogHydrator searchParams={searchParams} params={params} data={data}>
        <div className="mx-4">
          <FiltersBar
            options={options}
            segment={params.segment}
            isMobileDevice={true}
          />
            <InfiniteFeedCatalog />

        </div>
      </CatalogHydrator>
    </div>
  );
}
