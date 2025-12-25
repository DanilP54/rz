import { render, RenderOptions } from "@testing-library/react"
import React from "react"
import { Toaster } from "sonner";

export const TestProviders = ({children}: {children: React.ReactNode}) => {
    return (
        <>
            <Toaster />
            {children}
        </>
    )
}

export const renderComponent = (component: React.ReactNode, options?: RenderOptions) => {
    return render(component, {wrapper: TestProviders, ...options})
}