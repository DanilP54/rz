import { useEffect, useRef } from "react";
import type {
  FiltersRules,
  FilterRuleKey,
  VisibilityParams,
} from "../types";
import { isRuleVisible } from "../helpers/is-rule-visible";

type Setter = (...args: any[]) => any;
type SettersMap = Partial<Record<FilterRuleKey, Setter>>;

export function useAutoResetFilters(
  rules: FiltersRules,
  params: VisibilityParams,
  setters: SettersMap
): void {
  const prevVisibilityRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const prevVisibility = prevVisibilityRef.current;

    for (const rule of rules) {
      const key = rule.key;
      const currentValue = params[key];
      const isVisible = isRuleVisible(rule, params);
      const wasVisible = prevVisibility[key] ?? true;

      // Сбрасываем только при переходе visible -> hidden
      if (wasVisible && !isVisible && currentValue !== null) {
        setters[key]?.(null);
      }

      prevVisibility[key] = isVisible;
    }
  }, [rules, params, setters]);
}

