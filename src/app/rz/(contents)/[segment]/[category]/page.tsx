import { FiltersBar } from "@/features/rz/filters/FiltersBar";
import { loadSearchParams } from "@/features/rz/filters/model/search-params";
import { FILTER_OPTIONS } from "@/features/rz/filters/options";
import { NavSegments, SegmentCategory } from "@/shared/model/routes";
import { type SearchParams } from "nuqs/server";
import Link from "next/link";

type Params = {
  segment: NavSegments;
  category: SegmentCategory<NavSegments>;
};

type PageProps = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>
};

export default async function Page(props: PageProps) {
  const { segment, category } = await props.params;
  const searchParams = await loadSearchParams(props.searchParams)

  const filterOptions = FILTER_OPTIONS[segment][category]

  return (
    <div id={"page"} data-segment={segment} data-hassegment={String(Boolean(segment))}>
        <FiltersBar segment={segment} category={category} filters={filterOptions} />
      {/* CONTENT */}
      <Link href={`/rz/instincts/artist/damon`}>detail</Link>
    </div>
  );
}
