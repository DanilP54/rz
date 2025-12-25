import { getQueryClient } from "@/common/api/get-query-client";
import { RzPathParamsProps } from "../types";
import { getMovieById } from "@/common/api/gen";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { DetailsQuery } from "./details";

type DetailsPathParamsProps = {
  slug: string;
} & RzPathParamsProps;

interface DetailsRzLayoutProps {
  params: Promise<DetailsPathParamsProps>;
}

export async function PageMovieDetails(props: DetailsRzLayoutProps) {
  const { category, segment, slug } = await props.params;


  const clientQuery = getQueryClient()

  void clientQuery.prefetchQuery({
    queryKey: [category, segment, slug],
    queryFn: () => getMovieById(slug)
  })


  return (
    <>
        <HydrationBoundary state={dehydrate(clientQuery)}>
            <DetailsQuery category={category} segment={segment} slug={slug} />

        </HydrationBoundary>
    </>
  );
}
