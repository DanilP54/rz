import { FiltersBar, loadSearchParams } from "@/features/rz/filters";
import { NavSegments, SegmentCategory } from "@/shared/model/routes";
import { Suspense } from "react";

import { ContentCardList } from "./Content";
import { client } from "@/shared/api/client";
import { PageProps } from "@/app/rz/types";
import { getFilters } from "@/features/rz/filters/config/config";

async function getContent<T>(
  segment: NavSegments,
  category: SegmentCategory<NavSegments>,
  searchParams: T
) {
  // return client.GET('/content/{category}', {
  //   params: {
  //     path: { category },
  //     query: { ...searchParams, segment }
  //   }
  // })

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 2000);
  });
}

export default async function Page(props: PageProps) {
  
  const { segment, category } = await props.params;
  const searchParams = await loadSearchParams(props.searchParams);

  const contentListPromise = getContent(segment, category, { ...searchParams });

  const { rules, options } = getFilters(segment, category);

  return (
    <div
      id={"page"}
      data-segment={segment}
      data-hassegment={String(Boolean(segment))}
    >
      <FiltersBar
        rules={rules}
        options={options}
        segment={segment}
        category={category}
        isMobileDevice={false}
      />
      <Suspense fallback={<Fallback />}>
        <ContentCardList promise={contentListPromise} />
      </Suspense>
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
