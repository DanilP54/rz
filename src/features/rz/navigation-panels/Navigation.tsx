"use client";
import { useEffect, useState } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { For } from "@/shared/For";
import { navigationConfig } from "./config";
import { Panel } from "./ui/Panel";
import { useIntroHintDisplay } from "@/features/rz/navigation-panels/lib/useIntroHintDisplay";
import { toastHintManager } from "@/features/rz/navigation-panels/lib/toastHintManager";
import { RZ_SEGMENTS } from "@/shared/model/routes";
import { IntroHintDisplay } from "@/features/rz/navigation-panels/ui/IntroHintDisplay";

export const Navigation = ({
  isMobileDevice,
}: {
  isMobileDevice?: boolean;
}) => {
  const selectedSegment = useSelectedLayoutSegment() as Nullable<RZ_SEGMENTS>;
  const [openPreviewSegment, setOpenPreviewSegment] =
    useState<Nullable<RZ_SEGMENTS>>(null);
  const toast = toastHintManager();
  const displayIntroHint = useIntroHintDisplay(selectedSegment, true);

  useEffect(() => {
    if (displayIntroHint.asToast) {
      toast.show(navigationConfig.intro.text);
    }
  }, [selectedSegment, displayIntroHint.asToast]);

  const getPanelState = (segment: RZ_SEGMENTS) => {
    if (segment === selectedSegment) return "selected";
    if (segment === openPreviewSegment) return "preview";
    return "closed";
  };

  const handlePreviewToggle = (segment: RZ_SEGMENTS) => {
    setOpenPreviewSegment((prev) => (prev === segment ? null : segment));
  };

  return (
    <div id="navigation" className="relative flex flex-col">
      <For each={navigationConfig.getSegmentsList()}>
        {(segment) => {
          const panel = navigationConfig.segments[segment];
          return (
            <Panel
              key={segment}
              segment={segment}
              panel={panel}
              state={getPanelState(segment)}
              previewToggle={() => handlePreviewToggle(segment)}
              handleClosePreview={() => {}}
            />
          );
        }}
      </For>
      {displayIntroHint.asComponent && (
        <IntroHintDisplay text={navigationConfig.intro.text} />
      )}
    </div>
  );
};
