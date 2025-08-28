import { Filters } from "@/features/rz/filters/Filters";
import Link from "next/link";
import { ContentCategory, RZ_SEGMENTS } from "@/shared/model/routes";

type Params = {
  segment: RZ_SEGMENTS
  category: ContentCategory
}

type PageProps = {
  params: Promise<Params>,
}

export default async function Page({ params }: PageProps) {

  const { segment, category } = await params;

  return (
    <div
      data-segment={segment}
      data-hassegment={String(Boolean(segment))}
    >
      <Filters segment={segment} category={category} />
      <Link href={`/rz/instincts/artist/damon`}>detail</Link>
    </div>
  );
}
