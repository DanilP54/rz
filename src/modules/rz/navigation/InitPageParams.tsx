'use client'

import { useSelectedLayoutSegment } from "next/navigation";
import { useMemo } from "react";
import { selectedSegmentLayout } from "./Navigation";
import type { Segment } from "@/common/api/client";

export function InitPageParams({ children }: { children?: React.ReactNode }) {
    const selectedRouteSegment = useSelectedLayoutSegment() as Segment | null;

    useMemo(() => {
        selectedSegmentLayout.set(selectedRouteSegment)
    }, [selectedRouteSegment])

    return (
        <>{children}</>
    )
}