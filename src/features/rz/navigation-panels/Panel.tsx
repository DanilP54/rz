import React, { RefObject, useEffect, useRef } from "react";
import { useHintsStorage } from "./useHintsStorage";
import { Panel as IPanel, PanelState } from "./types";
import { useOnClickOutside } from "usehooks-ts";
import { getBgColorOfSegment } from "@/shared/lib/segment-bg-colors";
import { NavLinksPreview, NavLinksSelected } from "@/features/rz/navigation-panels/NavLinks";
import { usePathname } from "next/navigation";
import { useToastHintManager } from "@/features/rz/navigation-panels/useToastHintManager";
import { RZ_SEGMENTS } from "@/shared/model/routes";

interface PanelProps {
    state: PanelState;
    segment: RZ_SEGMENTS;
    panel: IPanel;
    onToggle: () => void;
    onCloseNavLinksPreview: () => void;
}

export function Panel({ state, panel, onToggle, segment, onCloseNavLinksPreview }: PanelProps) {

    const pathname = usePathname();
    const hintStorage = useHintsStorage();
    const hintToast = useToastHintManager();
    const navLinksPreviewRef = useRef<Nullable<HTMLElement>>(null);

    useEffect(() => {

        if (hintStorage.isSeen(segment)) return;

        let hintId: Option<string | number>;

        if (state === 'selected') {
            hintStorage.save(segment)
            hintId = hintToast.show(panel.about);
        }

        return () => {
            if (hintId) hintToast.hide(hintId)
        }
    }, [state]);

    useOnClickOutside(
        navLinksPreviewRef as RefObject<HTMLElement>,
        () => onCloseNavLinksPreview()
    );

    return (
        <div
            id={`${segment} panel`}
            data-testid={`${segment}-panel`}
            data-selected={state === "selected"}
            data-preview={state === "preview"}
            className={`group relative order-1 data-[selected=true]:order-0`}
        >
            <Toggle onToggle={onToggle} segment={segment}>
                {state === "preview" && (
                    <NavLinksPreview
                        links={panel.links}
                        segment={segment}
                        ref={navLinksPreviewRef}
                    />
                )}
                {state === "selected" && (
                    <NavLinksSelected
                        links={panel.links}
                        segment={segment}
                        pathname={pathname}
                    />
                )}
            </Toggle>
        </div>
    );
}


interface ToggleProps {
    onToggle: () => void
    segment: RZ_SEGMENTS
    children: React.ReactNode
}

function Toggle({ onToggle, segment, children }: ToggleProps) {
    return (
        <div
            onClick={onToggle}
            className={`w-[35px] group-data-[selected=true]:w-full cursor-pointer h-[40px] px-2 ${getBgColorOfSegment(
                segment
            )}`}
        >{children}</div>
    )
}
