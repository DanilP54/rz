
import { useMemo } from "react";

export type VisibilityParams = Record<string, string | undefined>;

export type FilterRuleKey = "topic" | "view";

export type FilterRule = {
  key: FilterRuleKey;
  dependsOn?: ReadonlyArray<FilterRuleKey>;
  visibleIf?: (params: VisibilityParams) => boolean;
};

export type FiltersRules = ReadonlyArray<FilterRule>;

export function useVisibleRules(
  rules: FiltersRules,
  params: VisibilityParams
) {
  return useMemo(() => {
    const result: Partial<Record<FilterRuleKey, boolean>> = {};

    rules.forEach((rule) => {
      let visible = true;

      if (rule.dependsOn?.length) {
        visible = rule.dependsOn.every((dep) => !!params[dep]);
      }

      if (rule.visibleIf) {
        visible = rule.visibleIf(params);
      }

      result[rule.key] = visible;
    });

    return result;
  }, [rules, params]);
}
