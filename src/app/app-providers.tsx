"use client";
import { getQueryClient } from "@/common/api/client/@tanstack/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

import { Toaster } from "sonner";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient()
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster duration={Infinity} position="top-center" mobileOffset={2} />
      </QueryClientProvider>
      {children}
    </ThemeProvider>
  );
};
