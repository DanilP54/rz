"use client";
import { RefObject, useEffect, useRef, useState } from "react";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { For } from "@/shared/For";
import { navigationConfig } from "./config";
import { useIntroHintDisplay } from "@/features/rz/navigation-panels/lib/useIntroHintDisplay";
import { toastHintManager } from "@/features/rz/navigation-panels/lib/toastHintManager";
import { RZ_SEGMENTS } from "@/shared/model/routes";
import { NavIntroHintDisplay } from "@/features/rz/navigation-panels/ui/NavIntroHintDisplay";
import { useOnClickOutside } from "usehooks-ts";
import { useHintsStorage } from "./lib/useHintsStorage";
import { SelectedNavigationPanel } from "./ui/SelectedNavigationPanel";
import { DesclosureNavigationPanel } from "./ui/DesclosureNavigationPanel";

export const Navigation = ({
  isMobileDevice,
}: {
  isMobileDevice?: boolean;
}) => {
  const selectedPanel = useSelectedLayoutSegment() as Nullable<RZ_SEGMENTS>;
  const pathname = usePathname()
  const [expendedPanel, setExpendedPanel] =
    useState<Nullable<RZ_SEGMENTS>>(null);
  const toast = toastHintManager();
  const storage= useHintsStorage()
  const displayIntroHint = useIntroHintDisplay(selectedPanel, true);
  const panelRef = useRef<Nullable<HTMLDivElement>>(null);

  useEffect(() => {
    if (displayIntroHint.asToast) {
      toast.show(navigationConfig.intro.text);
    }
  }, [selectedPanel, displayIntroHint.asToast])

  useEffect(() => {
   setExpendedPanel(null)
  }, [pathname])

  const handleToggle = (segment: RZ_SEGMENTS) => {
    setExpendedPanel((prev) => (prev === segment ? null : segment));
  };

  useOnClickOutside(panelRef as RefObject<HTMLDivElement>, (e) => {
    setExpendedPanel(null)
  });

  return (
    <div ref={panelRef} id="navigation" className="relative">
      <nav aria-label="Rodnaya Zemlya">
        <ul className="flex flex-col">
          <For each={Object.keys(navigationConfig.segments) as RZ_SEGMENTS[]}>
            {(segment) => {
              const panel = navigationConfig.segments[segment];
              return (
                <li key={segment} className="order-1 [&:has([data-selected=true])]:order-0">
                  {selectedPanel === segment ? (
                    <SelectedNavigationPanel 
                      pathname={pathname}
                      panel={panel} 
                      onShowHint={() => toast.show(panel.description)} 
                      onHideHint={(id: string | number) => toast.hide(id)}
                      onSaveHint={() => storage.save(segment)}
                      isSeenHint={storage.isSeen(segment)}
                    />
                  ) : (
                    <DesclosureNavigationPanel
                      panel={panel}
                      isExpanded={expendedPanel === segment}
                      onToggle={() => handleToggle(segment)}
                    />
                  )}
                </li>
              );
            }}
          </For>
        </ul>
      </nav>
      {displayIntroHint.asComponent && (
        <NavIntroHintDisplay text={navigationConfig.intro.text} />
      )}
    </div>
  );
};
