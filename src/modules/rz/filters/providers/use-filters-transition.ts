import { use } from "react";
import { TransitionContext } from "./transition.providers";

export const useFiltersTransition = () => {
  const context = use(TransitionContext);

  if (!context) {
    throw new Error("Error transition context");
  }

  return context;
};
