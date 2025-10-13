import {
  NAV_SEGMENTS,
  type NavSegments,
  type SegmentCategory,
} from "@/shared/model/routes";

import type {
  CategorySchema,
  FiltersSchema,
  FilterOptionsByParams,
  FiltersRules
} from "../types";

import { INSTINCTS_SCHEMA } from "./instincts";
import { INTELLECT_SCHEMA } from "./intellect";
import { BALANCE_SCHEMA } from "./balance";


export const FILTERS_SCHEMA: FiltersSchema = {
  [NAV_SEGMENTS.INSTINCTS]: INSTINCTS_SCHEMA,
  [NAV_SEGMENTS.INTELLECT]: INTELLECT_SCHEMA,
  [NAV_SEGMENTS.BALANCE]: BALANCE_SCHEMA,
};

export function getCategorySchema<S extends NavSegments>(
  segment: S,
  category: SegmentCategory<S>
): CategorySchema {
  return FILTERS_SCHEMA[segment][category];
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
