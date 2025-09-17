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
import { SelectedNavigationPanel } from "./ui/SelectedNavigationPanel";
import { DisclosureNavigationPanel } from "./ui/DisclosureNavigationPanel";

export const NavigationPanels = ({
  isMobileDevice,
}: {
  isMobileDevice: boolean;
}) => {

  const selectedPanel = useSelectedLayoutSegment() as Nullable<RZ_SEGMENTS>;
  const pathname = usePathname()
  const [expandedPanel, setExpandedPanel] = useState<Nullable<RZ_SEGMENTS>>(null);
  const toast = toastHintManager();
  const displayIntroHint = useIntroHintDisplay(selectedPanel, isMobileDevice);
  const navBoxRef = useRef<Nullable<HTMLDivElement>>(null);

  useEffect(() => {
    if (displayIntroHint.asToast) {
      toast.show(navigationConfig.intro.text);
    }
  }, [selectedPanel, displayIntroHint.asToast])

  useEffect(() => {
    if (!!expandedPanel) {
      setExpandedPanel(null)
    }
  }, [pathname])

  const handleToggle = (segment: RZ_SEGMENTS) => {
    setExpandedPanel((prev) => (prev === segment ? null : segment));
  };

  useOnClickOutside(navBoxRef as RefObject<HTMLDivElement>, (e) => {
    setExpandedPanel(null)
  });

  return (
    <div ref={navBoxRef} id="nav-wrap" className="relative">
      <nav id="nav-root">
        <ul id="nav-list" className="flex flex-col">
          <For each={Object.keys(navigationConfig.panels) as RZ_SEGMENTS[]}>
            {(segment) => {
              const panel = navigationConfig.panels[segment];
              const isSelected = selectedPanel === segment
              return (
                <li id="nav-panel" key={segment} className="order-1 [&:has([data-selected=true])]:order-0">
                  {isSelected ? (
                    <SelectedNavigationPanel
                      isSelected={isSelected}
                      currentPath={pathname}
                      panel={panel}
                    />
                  ) : (
                    <DisclosureNavigationPanel
                      panel={panel}
                      isExpanded={expandedPanel === segment}
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
