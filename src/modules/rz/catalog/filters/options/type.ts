
// import type { SearchParamsCatalog } from "../model/search-params.catalog";
import { Category, Segment } from '@/client';
import type {CatalogSearchParams} from '../model/search-params.model';

export interface FilterOption<Values = string> {
  label: string;
  value: Values;
}

export type OptionsBySearchParams = {
    [K in keyof Required<CatalogSearchParams>]: FilterOption<CatalogSearchParams[K]>[]
};

export type OptionsByCategory = Record<Category, OptionsBySearchParams>;
export type OptionsBySegment = Record<Segment, OptionsByCategory>;
