import { FiltersBar, loadSearchParams } from "@/features/rz/filters";
import { NavSegments, SegmentCategory } from "@/shared/model/routes";
import { type SearchParams } from "nuqs/server";
import { Suspense } from "react";

import { ContextProvider } from "./prov";
import { Content } from "./Content";

type Params = {
  segment: NavSegments;
  category: SegmentCategory<NavSegments>;
};

type PageProps = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
};

async function getContent<T>(
  segment: NavSegments,
  category: SegmentCategory<NavSegments>,
  searchParams: T
) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 3000);
  });
}

export default async function Page(props: PageProps) {
  const { segment, category } = await props.params;
  const searchParams = await loadSearchParams(props.searchParams);
  console.log(searchParams)
  const cardListPromise = getContent(segment, category, {
    ...searchParams,
  });

  return (
    <div
      id={"page"}
      data-segment={segment}
      data-hassegment={String(Boolean(segment))}
    >
      <ContextProvider>
        <FiltersBar segment={segment} category={category} isMobileDevice={false} />
        <Suspense fallback={<Fallback />}>
          <Content promise={cardListPromise} />
        </Suspense>
      </ContextProvider>
    </div>
  );
}



function Fallback() {
  return (
    <>
      <h1>Cards loading</h1>
    </>
  )
}