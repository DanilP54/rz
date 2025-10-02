import { Filters } from "@/features/rz/filters/Filters";
import { NavSegments, SegmentCategory } from "@/shared/model/routes";
import Link from "next/link";

type Params = {
  segment: NavSegments;
  category: SegmentCategory<NavSegments>;
};

type PageProps = {
  params: Promise<Params>;
};

export default async function Page({ params }: PageProps) {
  const { segment, category } = await params;

  return (
    <div
      id={"page"}
      data-segment={segment}
      data-hassegment={String(Boolean(segment))}
    >
      <Filters segment={segment} category={category} />
      <Link href={`/rz/instincts/artist/damon`}>detail</Link>
    </div>
  );
}
