import { FiltersBar } from "@/features/rz/filters/filters-bar";
import { loadSearchParams } from "@/features/rz/filters/model/search-params";
import { NavSegments, SegmentCategory } from "@/shared/model/routes";
import { type SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { SearchParams as FiltersSP } from "@/features/rz/filters/model/search-params";
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

async function getContent(
  segment: NavSegments,
  category: SegmentCategory<NavSegments>,
  searchParams: FiltersSP
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
        <FiltersBar segment={segment} category={category} />
        <Suspense
          // key={`${searchParams.topic}-${searchParams.view}`}
          fallback={
            <>
              <h1>Cards loading</h1>
            </>
          }
        >
          <Content promise={cardListPromise} />
        </Suspense>
      </ContextProvider>
    </div>
  );
}
