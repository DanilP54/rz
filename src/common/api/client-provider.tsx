"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "./get-query-client";
import type * as React from "react";
import { reatomContext } from "@reatom/react";
import { context } from "@reatom/core";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    // <reatomContext.Provider value={context.start()}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    // </reatomContext.Provider>
  );
}
