import type { FilterRuleBase, VisibilityParams } from "../types";

export const isRuleVisible = (
  rule: FilterRuleBase,
  params: VisibilityParams
): boolean => {
  if (rule.visibleIf) return rule.visibleIf(params);
  if (rule.dependsOn?.length)
    return rule.dependsOn.every((dep) => params[dep] !== null);
  return true;
};



export const isRuleVisiblee = (
  rule: FilterRuleBase,
  params: VisibilityParams
): boolean => {
  
};