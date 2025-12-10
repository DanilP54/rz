
import { NavSegments, SegmentCategory } from "@/common/model/routes";
import { type SearchParams } from "nuqs";

export type Params = {
    segment: NavSegments;
    category: SegmentCategory<NavSegments>;
};

export type PageProps = {
    params: Promise<Params>;
    searchParams: Promise<SearchParams>;
};