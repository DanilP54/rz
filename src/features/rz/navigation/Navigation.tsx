"use client";
import { RefObject, useEffect, useRef, useState } from "react";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { For } from "@/shared/For";
import { config } from "./config";
import { useIntroHintDisplay } from "@/features/rz/navigation/lib/useIntroHintDisplay";
import { toastHintManager } from "@/features/rz/navigation/lib/toastHintManager";
import { RZ_SEGMENTS } from "@/shared/model/routes";
import { NavIntroHintDisplay } from "@/features/rz/navigation/ui/NavIntroHintDisplay";
import { useOnClickOutside } from "usehooks-ts";
import { SelectedNavigationPanel } from "./ui/SelectedNavigationPanel";
import { DisclosureNavigationPanel } from "./ui/DisclosureNavigationPanel";


const segments = Object.keys(config.panels) as RZ_SEGMENTS[];

const getSortedSegments = (
  activeRouteSegment: Nullable<RZ_SEGMENTS>,
  isMobileDevice: boolean
): RZ_SEGMENTS[] => {
  return [...segments].sort((a, b) => {
    if (a === activeRouteSegment) return isMobileDevice ? -1 : 1;
    if (b === activeRouteSegment) return isMobileDevice ? 1 : -1;
    return 0;
  });
};

export const Navigation = ({
  isMobileDevice,
}: {
  isMobileDevice: boolean;
}) => {

  const activeRouteSegment = useSelectedLayoutSegment() as Nullable<RZ_SEGMENTS>;
  const pathname = usePathname()
  const [expandedPanel, setExpandedPanel] = useState<Nullable<RZ_SEGMENTS>>(null);
  const toast = toastHintManager();
  const displayIntroHint = useIntroHintDisplay(activeRouteSegment, isMobileDevice);
  const navRef = useRef<Nullable<HTMLDivElement>>(null);

  const sortedSegments = getSortedSegments(activeRouteSegment, isMobileDevice);

  useEffect(() => {
    if (displayIntroHint.asToast) {
      toast.show(config.intro.text);
    }
  }, [activeRouteSegment, displayIntroHint.asToast])

  useEffect(() => {
    if (!!expandedPanel) {
      setExpandedPanel(null)
    }
  }, [pathname])

  const handleToggle = (segment: RZ_SEGMENTS) => {
    setExpandedPanel((prev) => (prev === segment ? null : segment));
  };

  useOnClickOutside(navRef as RefObject<HTMLDivElement>, (e) => {
    if(!!expandedPanel) {
      setExpandedPanel(null)
    }
  });

  return (
    <div ref={navRef} id="nav-wrap" className="relative">
      <nav id="nav-root">
        <ul id="nav-list" data-testid="nav-list" className="flex flex-col">
          <For each={sortedSegments}>
            {(segment) => {
              const panel = config.panels[segment];
              const isSelected = activeRouteSegment === segment
              return (                
              <li id="nav-panel" data-segment={segment} key={segment}>
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
        <NavIntroHintDisplay text={config.intro.text} />
      )}
    </div>
  );
};
