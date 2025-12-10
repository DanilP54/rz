import { cn } from "@/common/lib/utils";
import { ComponentProps } from "react";

export function FiltersGroupsLayout({
    children,
    ...props
}: { children: React.ReactNode } & ComponentProps<'div'>) {
    return (
        <div className={cn(`flex flex-col w-full `, props.className)}>
            {children}
        </div>
    )
}