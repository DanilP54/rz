"use client";

import React, { createContext, use, useTransition } from "react";


type ContextType = {
    isPending: boolean;
    startTransition: React.TransitionStartFunction
}

const Context = createContext<ContextType | null>(null);

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPending, startTransition] = useTransition();

  const value = {
    isPending,
    startTransition,
  };

  return <Context value={value}>{children}</Context>;
};

export const useContextCus = () => {
    const context = use(Context)
    if(!context) {
        throw new Error('Error context')
    }

    return context
}
