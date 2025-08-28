"use client";
import { useEffect, useState } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { For } from "@/shared/For";
import { navigationConfig } from "./config";
import { Panel } from "./Panel";
import { useIntroHintDisplay } from "@/features/rz/navigation-panels/useIntroHintDisplay";
import { useToastHintManager } from "@/features/rz/navigation-panels/useToastHintManager";
import { RZ_SEGMENTS } from "@/shared/model/routes";

export const Navigation = ({ isMobileDevice }: { isMobileDevice?: boolean }) => {

    const selectedSegment = useSelectedLayoutSegment() as Option<RZ_SEGMENTS>;
    const [previewNavLinksSegment, setPreviewNavLinksSegment] = useState<RZ_SEGMENTS | null>(null);
    const hintToast = useToastHintManager();
    const displayIntroHint = useIntroHintDisplay(selectedSegment, true);

    useEffect(() => {
        if (displayIntroHint.asToast) hintToast.show(navigationConfig.introText);
    }, [selectedSegment, displayIntroHint.asToast]);

    const getPanelState = (segment: RZ_SEGMENTS) => {
        if (segment === selectedSegment) return "selected";
        if (segment === previewNavLinksSegment) return "preview";
        return "closed";
    };

    function previewNavLinksToggle(segment: RZ_SEGMENTS) {
        setPreviewNavLinksSegment((prev) => prev === segment ? null : segment)
    }

    return (
        <div id="navigation" className=" relative flex flex-col">
            <For each={navigationConfig.getSegmentsList()}>
                {(segment) => {
                    const panel = navigationConfig.panels[segment];
                    return (
                        <Panel
                            key={segment}
                            segment={segment}
                            panel={panel}
                            state={getPanelState(segment)}
                            onToggle={() => previewNavLinksToggle(segment)}
                            onCloseNavLinksPreview={() => setPreviewNavLinksSegment(null)}
                        />
                    );
                }}
            </For>
            {displayIntroHint.asComponent && <IntroHint text={navigationConfig.introText} />}
        </div>
    );
};


function IntroHint({ text }: { text: string }) {
    return (
        <div className="absolute top-0 flex h-[120px] items-center right-0 w-[calc(100%-35px)]">
            <div className="flex items-center justify-center text-center px-3">
                <span className="grow font-bold text-xs">{text}</span>
            </div>
        </div>
    );
}
