"use client";

import React, { createContext, use, useTransition } from "react";

type ContextType = {
  isPending: boolean;
  startTransition: React.TransitionStartFunction
}

const TransitionContext = createContext<ContextType | null>(null);

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPending, startTransition] = useTransition();

  return <TransitionContext value={{
    isPending,
    startTransition
  }}>{children}</TransitionContext>;
};

export const useTransitionContext = () => {
  const context = use(TransitionContext)
  
  if (!context) {
    throw new Error('Error transition context')
  }

  return context
}
