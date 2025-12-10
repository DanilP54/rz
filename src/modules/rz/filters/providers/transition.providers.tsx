"use client";

import React, { createContext, useTransition } from "react";

interface ITransitionContext {
  isPending: boolean;
  startTransition: React.TransitionStartFunction;
}

export const TransitionContext = createContext<ITransitionContext | null>(null);

export const FiltersTransitionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <TransitionContext
      value={{
        isPending,
        startTransition,
      }}
    >
      {children}
    </TransitionContext>
  );
};

