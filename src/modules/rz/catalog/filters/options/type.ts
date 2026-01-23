
// import type { SearchParamsCatalog } from "../model/search-params.catalog";
import type { Category, Segment } from '@/common/api/client';
import { CatalogFilters } from '../model/schema';


export interface FilterOption<Values = string> {
  label: string;
  value: Values;
}

export type OptionsBySearchParams = {
    [K in keyof Required<CatalogFilters>]: FilterOption<CatalogFilters[K]>[]
};

export type OptionsByCategory = Record<Category, OptionsBySearchParams>;
export type OptionsBySegment = Record<Segment, OptionsByCategory>;
