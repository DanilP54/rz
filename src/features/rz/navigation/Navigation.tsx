"use client";
import React, { RefObject, useEffect, useRef, useState } from "react";
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
import { NavigationConfig } from "./types";
import { useHintsStorage } from "./lib/useHintsStorage";

export const Navigation = ({ isMobileDevice }: { isMobileDevice: boolean }) => {
  
  const selectedRouteSegment = useSelectedLayoutSegment() as Nullable<NavSegments>;
  const pathname = usePathname();
  const storage = useHintsStorage()
  const toast = toastHintManager();
  const displayIntroHint = useIntroHintDisplay(
    selectedRouteSegment,
    isMobileDevice
  );

  useEffect(() => {
    if (displayIntroHint.asToast) {
      toast.show(config.intro.text);
    }
  }, [displayIntroHint.asToast]);

  useEffect(() => {
    if(!selectedRouteSegment || storage.isSeen(selectedRouteSegment)) return;
    const panel = config.panels[selectedRouteSegment]
    const id = toast.show(panel.hintText)
    storage.save(selectedRouteSegment)

    return () => {
      if (id) toast.hide(id)
    }
    
  }, [selectedRouteSegment])

  return (
    <div  id="nav-wrap" className="relative">
      <NavigationPanels 

        config={config} 
        currentPathname={pathname} 
        selectedRouteSegment={selectedRouteSegment} 
        isMobileDevice={isMobileDevice} 
      />
      {displayIntroHint.asComponent && (<NavIntroHintDisplay text={config.intro.text} />)}
    </div>
  );
};

interface NavigationPanelsProps {
  config: NavigationConfig;
  currentPathname: string;
  selectedRouteSegment:  Nullable<NavSegments>;
  isMobileDevice: boolean;
}


function NavigationPanels(props: NavigationPanelsProps) {

  const { config, currentPathname, selectedRouteSegment, isMobileDevice } = props;

  const [expandedDiscPanel, setExpandedDiscPanel] =
    useState<Nullable<NavSegments>>(null);
  const segments = Object.keys(props.config.panels) as NavSegments[];
  const navElementRef = useRef<Nullable<HTMLDivElement>>(null);

  const sortedSegments = sortWithActiveItem({
    items: segments,
    active: {
      identifier: selectedRouteSegment,
      getKey: (segments) => segments,
    },
    move: {
      when: isMobileDevice,
      then: "start",
      else: "end",
    },
  });

  useEffect(() => setExpandedDiscPanel(null), [currentPathname])

  const onToggleDiscPanels = (segment: NavSegments) => {
    setExpandedDiscPanel((prev) => (prev === segment ? null : segment));
  }

  useOnClickOutside(navElementRef as RefObject<HTMLDivElement>, () => setExpandedDiscPanel(null));

  return (
    <nav ref={navElementRef} id="nav-root">
      <ul id="nav-list" data-testid="nav-list" className="flex flex-col">
        <For each={sortedSegments}>
          {(segment) => {
            const panel = config.panels[segment];
            const isSelected = selectedRouteSegment === segment;
            const isExpanded = expandedDiscPanel === segment;
            return (
              <li id="nav-panel" data-segment={segment} key={segment}>
                {isSelected ? (
                  <SelectedNavigationPanel
                    isSelected={isSelected}
                    currentPath={currentPathname}
                    panel={panel}
                  />
                ) : (
                  <DisclosureNavigationPanel
                    panel={panel}
                    isExpanded={isExpanded}
                    onToggle={() => onToggleDiscPanels(segment)}
                  />
                )}
              </li>
            );
          }}
        </For>
      </ul>
    </nav>
  )
}