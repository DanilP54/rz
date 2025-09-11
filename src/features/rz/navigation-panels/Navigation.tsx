"use client";
import { useEffect, useState } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { For } from "@/shared/For";
import { navigationConfig } from "./config";
import { NavigationPanel } from "./ui/Panel";
import { useIntroHintDisplay } from "@/features/rz/navigation-panels/lib/useIntroHintDisplay";
import { toastHintManager } from "@/features/rz/navigation-panels/lib/toastHintManager";
import { RZ_SEGMENTS } from "@/shared/model/routes";
import { NavIntroHintDisplay } from "@/features/rz/navigation-panels/ui/NavIntroHintDisplay";

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
      <nav aria-label="Rodnaya Zemlya">
        <For each={Object.keys(navigationConfig.segments) as RZ_SEGMENTS[]}>
          {(segment) => {
            const panel = navigationConfig.segments[segment];
            return (
              <NavigationPanel
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
      </nav>
      {displayIntroHint.asComponent && (
        <NavIntroHintDisplay text={navigationConfig.intro.text} />
      )}
    </div>
  );
};
