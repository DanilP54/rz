"use client";

import React, { createContext, use, useTransition } from "react";

interface ITransitionContext {
  isPending: boolean;
  startTransition: React.TransitionStartFunction;
}

const TransitionContext = createContext<ITransitionContext | null>(null);

export const TransitionProvider = ({
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

export const useTransitAction = () => {
  const context = use(TransitionContext);

  if (!context) {
    throw new Error("Error transition context");
  }

  return context;
};
