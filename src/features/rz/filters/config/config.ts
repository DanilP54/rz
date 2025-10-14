import {
  NAV_SEGMENTS,
  type NavSegments,
  type SegmentCategory,
} from "@/shared/model/routes";

import type {
  CategorySchema,
  FiltersSchema,
  FilterOptionsByParams,
  FiltersRules,
} from "../types";

import { INSTINCTS_CONFIG } from "./instincts";
import { INTELLECT_CONFIG } from "./intellect";
import { BALANCE_CONFIG } from "./balance";

export const FILTERS_CONFIG: FiltersSchema = {
  [NAV_SEGMENTS.INSTINCTS]: INSTINCTS_CONFIG,
  [NAV_SEGMENTS.INTELLECT]: INTELLECT_CONFIG,
  [NAV_SEGMENTS.BALANCE]: BALANCE_CONFIG,
};

export function getCategorySchema<S extends NavSegments>(
  segment: S,
  category: SegmentCategory<S>
): CategorySchema {
  return FILTERS_CONFIG[segment][category];
}

export function getFilterRules<S extends NavSegments>(
  segment: S,
  category: SegmentCategory<S>
): FiltersRules {
  return getCategorySchema(segment, category).rules;
}

export function getFilterOptions<S extends NavSegments>(
  segment: S,
  category: SegmentCategory<S>
): Readonly<FilterOptionsByParams> {
  return getCategorySchema(segment, category).options;
}

export function getFilters<S extends NavSegments>(
  segment: S,
  category: SegmentCategory<S>
): {
  readonly options: Readonly<FilterOptionsByParams>;
  readonly rules: FiltersRules;
} {
  const schema = getCategorySchema(segment, category);
  return { options: schema.options, rules: schema.rules };
}
