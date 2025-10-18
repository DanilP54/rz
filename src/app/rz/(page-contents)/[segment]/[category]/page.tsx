import { FiltersBar, loadSearchParams } from "@/features/rz/filters";
import { NavSegments, SegmentCategory } from "@/shared/model/routes";
import { Suspense } from "react";

import { ContentCardList } from "./Content";
import { client } from "@/shared/api/client";
import { PageProps } from "@/app/rz/types";
import { getFilters } from "@/features/rz/filters/config/config";
import { TransitionProvider } from "../../TransitionProvider";

async function getContentPromise<T>(
  segment: NavSegments,
  category: SegmentCategory<NavSegments>,
  searchParams?: T
) {

  await new Promise((resolve) => setTimeout(resolve, 2000));
  return client.GET('/content/{category}', {
    params: { path: { category } }
  }).then(res => res.data || []);
}


export default async function Page(props: PageProps) {
  
  const { segment, category } = await props.params;
  const searchParams = await loadSearchParams(props.searchParams);
  
  const resPromise = getContentPromise(segment, category);
  const { rules, options } = getFilters(segment, category);

  return (
    <div
      id={"page"}
      data-segment={segment}
      data-hassegment={String(Boolean(segment))}
    >
      <TransitionProvider>
        <FiltersBar
          rules={rules}
          options={options}
          segment={segment}
          category={category}
          isMobileDevice={false}
        />
        <Suspense fallback={<Fallback />}>
          <ContentCardList promise={resPromise} />
        </Suspense>
    </TransitionProvider>
    </div>
  );
}

function Fallback() {
  return (
    <>
      <h1>Cards loading</h1>
    </>
  );
}
