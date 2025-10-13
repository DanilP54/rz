import { useEffect, useRef } from "react";
import type {
  AutoResetFilterRule,
  FiltersRules,
  FilterRuleKey,
  VisibilityParams,
} from "../types";
import { isRuleVisible } from "../helpers/is-rule-visible";

type Setter = (...args: any[]) => any;
type SettersMap = Partial<Record<FilterRuleKey, Setter>>;

export function useAutoResetFilters(
  rules: FiltersRules<AutoResetFilterRule>,
  params: VisibilityParams,
  setters: SettersMap
): void {
  const prevParamsRef = useRef<VisibilityParams>({});

  useEffect(() => {
    const prevParams = prevParamsRef.current;

    for (const rule of rules) {
      const key = rule.key;
      const currentValue = params[key];
      const isVisible = isRuleVisible(rule, params);

      // 1) Reset when hidden
      if (!isVisible && currentValue !== null) {
        const next = rule.onReset?.({ key, reason: "hide", params });
        setters[key]?.(next ?? null);
        continue;
      }

      // 2) Reset when any dependency changed while value is set
      if (isVisible && rule.dependsOn?.length && currentValue !== null) {
        const depsChanged = rule.dependsOn.some(
          (dep) => prevParams[dep] !== params[dep]
        );
        if (depsChanged) {
          const next = rule.onReset?.({
            key,
            reason: "dependencyChange",
            params,
          });
          setters[key]?.(next ?? null);
        }
      }
    }

    prevParamsRef.current = { ...params };
  }, [rules, params, setters]);
}
