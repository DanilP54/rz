import { render, RenderOptions } from "@testing-library/react"
import React from "react"
import { TestProviders } from "./prviders"

export const renderComponent = (component: React.ReactNode, options?: RenderOptions) => {
    return render(component, {wrapper: TestProviders, ...options})
}