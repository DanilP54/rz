import { useMemo } from "react";
import type { FiltersRules, VisibilityParams, FilterRuleKey } from "../types";
import { isRuleVisible } from "../helpers/is-rule-visible";

export function useVisibleRules(rules: FiltersRules, params: VisibilityParams) {
  return useMemo(() => {
    return rules.reduce<Partial<Record<FilterRuleKey, boolean>>>(
      (acc, rule) => {
        acc[rule.key] = isRuleVisible(rule, params);
        return acc;
      },
      {}
    );
  }, [rules, params]);
}
