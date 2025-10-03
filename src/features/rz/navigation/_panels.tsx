import { For } from "@/shared/For";
import { NavSegments } from "@/shared/model/routes";
import { useState, useRef, useEffect, RefObject } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { DisclosurePanel } from "./_disclosure-panel";
import { sortWithActiveItem } from "./lib/_sort-active-item";
import { toastHintManager } from "./lib/_toast-hint-manager";
import { useHintsStorage } from "./lib/_use-hints-storage";
import { SelectedPanel } from "./_selected-panel";
import { NavigationConfig } from "./types";

interface NavigationPanelsProps {
  config: NavigationConfig;
  currentPathname: string;
  selectedRouteSegment:  Nullable<NavSegments>;
  isMobileDevice: boolean;
}

export function Panels(props: NavigationPanelsProps) {

    const { config, currentPathname, selectedRouteSegment, isMobileDevice } = props;
  
    const [expandedDiscPanel, setExpandedDiscPanel] =
      useState<NavSegments | null>(null);
    const storage = useHintsStorage()
    const toast = toastHintManager();
    const navElementRef = useRef<HTMLDivElement | null>(null);
    
    const segments = Object.keys(config.panels) as NavSegments[];
  
    const sortedSegments = sortWithActiveItem<NavSegments>({
      items: segments,
      isActive: (segment) => segment === selectedRouteSegment,
      move: {
        when: isMobileDevice,
        then: "start",
        else: "end",
      },
    });
  
    useEffect(() => {
      // отвечает за отображение навигационных подсказок для панелей
      if (!selectedRouteSegment || storage.isSeen(selectedRouteSegment)) return;
      const panel = config.panels[selectedRouteSegment];
      const id = toast.show(panel.hintText);
      storage.save(selectedRouteSegment);
  
      return () => {
        if (id) toast.hide(id);
      };
    }, [selectedRouteSegment]);
  
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
                    <SelectedPanel
                      isSelected={isSelected}
                      currentPath={currentPathname}
                      panel={panel}
                    />
                  ) : (
                    <DisclosurePanel
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