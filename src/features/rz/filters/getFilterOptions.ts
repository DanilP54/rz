import { NavSegments, SegmentCategory } from "@/shared/model/routes";
import { FILTER_OPTIONS } from "./options";

export function getFiltersOptions<
T extends NavSegments, 
C extends SegmentCategory<T>>
(segment: T, category: C) 
{
    return FILTER_OPTIONS[segment][category]
}