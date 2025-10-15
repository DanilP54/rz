
import { NavSegments, SegmentCategory } from "@/shared/model/routes";
import { SearchParams } from "nuqs";

export type Params = {
    segment: NavSegments;
    category: SegmentCategory<NavSegments>;
};

export type PageProps = {
    params: Promise<Params>;
    searchParams: Promise<SearchParams>;
};