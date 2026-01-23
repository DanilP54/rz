  import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
  import { FiltersBar, getCatalogFiltersOptions } from "./filters";
  import { InfiniteFeedCatalog } from "./infinite-feed.catalog";

  import { CatalogParamsSchema, type CatalogPageProps } from "./type";
  import { getQueryClient } from "@/common/api/client/@tanstack/get-query-client";
  import { getCatalogInfiniteOptions } from "@/common/api/client/@tanstack/react-query.gen";
  import { validateSearchParams } from "./filters/model/validator";
import { notFound } from "next/navigation";

  export async function PageCatalog(props: CatalogPageProps) {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const validatedSearchParams = validateSearchParams(searchParams);
    const validatedParams = CatalogParamsSchema.safeParse(params)
    
    if(!validatedParams.success) {
      notFound();
    }

    const filters = {
      segment: validatedParams.data.segment,
      ...validateSearchParams,
    }

    // const queryClient = getQueryClient()

    // void queryClient.prefetchInfiniteQuery(
    //   getCatalogInfiniteOptions({
    //     path: {
    //       category: validatedParams.data.category
    //     },
    //     query: {
    //       ...filters
    //     }
    //   })
    // )
    const options = getCatalogFiltersOptions(params.segment, params.category);

    return (

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
            {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
              <InfiniteFeedCatalog />
            {/* </HydrationBoundary> */}
          </div>
        </div>
    );
  }
