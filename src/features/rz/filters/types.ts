import type { NavSegments, SegmentCategory } from "@/shared/model/routes";
import type { SearchParams, SearchParamsKeys } from "./model/search-params";

export type VisibilityParams = Record<string, string | null | undefined>;

export type FilterRuleKey = SearchParamsKeys;

export interface FilterRuleBase {
  readonly key: FilterRuleKey;
  readonly dependsOn?: ReadonlyArray<FilterRuleKey>;
  readonly visibleIf?: (params: VisibilityParams) => boolean;
}

export type ResetReason = "hide" | "dependencyChange";

export interface ResetContext {
  readonly key: FilterRuleKey;
  readonly reason: ResetReason;
  readonly params: VisibilityParams;
}

export interface AutoResetFilterRule extends FilterRuleBase {
  readonly onReset?: (ctx: ResetContext) => unknown;
}

export type FiltersRules<TRule extends FilterRuleBase = FilterRuleBase> =
  ReadonlyArray<TRule>;

// Shared filter options types
export type FilterOption<Param> = {
  label: string;
  value: Param;
};

export type FilterOptionsByParams = {
  [P in keyof SearchParams]: FilterOption<NonNullable<SearchParams[P]>>[];
};

// Schema types
export type CategorySchema = {
  rules: FiltersRules; // array of rule objects
  options: Readonly<FilterOptionsByParams>;
};

export type SegmentSchema<S extends NavSegments = NavSegments> = {
  [C in SegmentCategory<S>]: CategorySchema;
};

export type FiltersSchema = {
  [S in NavSegments]: SegmentSchema<S>;
};
