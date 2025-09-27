"use client";
import { RefObject, useEffect, useRef, useState } from "react";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { For } from "@/shared/For";
import { config } from "./config";
import { useIntroHintDisplay } from "@/features/rz/navigation/lib/useIntroHintDisplay";
import { toastHintManager } from "@/features/rz/navigation/lib/toastHintManager";
import { NavSegments } from "@/shared/model/routes";
import { NavIntroHintDisplay } from "@/features/rz/navigation/ui/NavIntroHintDisplay";
import { useOnClickOutside } from "usehooks-ts";
import { SelectedNavigationPanel } from "./ui/SelectedNavigationPanel";
import { DisclosureNavigationPanel } from "./ui/DisclosureNavigationPanel";
import { sortWithActiveItem } from "./lib/sorting";

const segments = Object.keys(config.panels) as NavSegments[];

export const Navigation = ({ isMobileDevice }: { isMobileDevice: boolean }) => {
  const activeRouteSegment =
    useSelectedLayoutSegment() as Nullable<NavSegments>;
  const pathname = usePathname();
  const [expandedDiscPanel, setExpandedDiscPanel] =
    useState<Nullable<NavSegments>>(null);
  const toast = toastHintManager();
  const displayIntroHint = useIntroHintDisplay(
    activeRouteSegment,
    isMobileDevice
  );

  const navElementRef = useRef<Nullable<HTMLDivElement>>(null);

  const sortedSegments = sortWithActiveItem({
    items: segments,
    active: {
      identifier: activeRouteSegment,
      getKey: (segments) => segments,
    },
    move: {
      when: isMobileDevice,
      then: "start",
      else: "end",
    },
  });

  useEffect(() => {
    if (displayIntroHint.asToast) {
      toast.show(config.intro.text);
    }
  }, [displayIntroHint.asToast]);

  useEffect(() => {
    if (!!expandedDiscPanel) {
      setExpandedDiscPanel(null);
    }
  }, [pathname]);

  const handleToggle = (segment: NavSegments) => {
    setExpandedDiscPanel((prev) => (prev === segment ? null : segment));
  };

  useOnClickOutside(navElementRef as RefObject<HTMLDivElement>, (e) => {
    if (!!expandedDiscPanel) {
      setExpandedDiscPanel(null);
    }
  });

  return (
    <div ref={navElementRef} id="nav-wrap" className="relative">
      <nav id="nav-root">
        <ul id="nav-list" data-testid="nav-list" className="flex flex-col">
          <For each={sortedSegments}>
            {(segment) => {
              const panel = config.panels[segment];
              const isSelected = activeRouteSegment === segment;
              const isExpanded = expandedDiscPanel === segment;
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
                      isExpanded={isExpanded}
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
