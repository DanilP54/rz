import React from "react";
import { Toaster } from "sonner";

export const TestProviders = ({children}: {children: React.ReactNode}) => {
    return (
        <>
            <Toaster />
            {children}
        </>
    )
}