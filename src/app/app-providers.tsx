"use client";
import { ThemeProvider } from "next-themes";

import { Toaster } from "sonner";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <Toaster duration={Infinity} position="top-center" mobileOffset={2} />
      {children}
    </ThemeProvider>
  );
};
