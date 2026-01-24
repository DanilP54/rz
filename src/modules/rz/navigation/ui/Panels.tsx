
import { For } from "@/common/For";
import { NavSegments } from "@/common/model/routes";
import { useState, useRef, useEffect, RefObject } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { DisclosurePanel } from "./DisclosurePanel";
import { sortWithActiveItem } from "../lib/sort-active-item";
import { NavigationConfig } from "../types";
import { SelectedPanel } from "./SelectedPanel";
import { useDisclosurePanel } from "../hooks/use-disclosure-panel";
import { useNavigationHints } from "../hooks/use-navigation-hints";


interface IPanels {
  config: NavigationConfig;
  currentPathname: string;
  selectedRouteSegment: Nullable<NavSegments>;
  isMobileDevice: boolean;
}

export function Panels(props: IPanels) {
  const { config, currentPathname, selectedRouteSegment, isMobileDevice } =
    props;

  const navElementRef = useRef<HTMLDivElement | null>(null);

  const segments = Object.keys(config.panels) as NavSegments[];
  const sortedSegments = useSortedSegments(segments, selectedRouteSegment, isMobileDevice);

  useNavigationHints(config, selectedRouteSegment);

  const { expandedDiscPanel, onToggleDiscPanel } = useDisclosurePanel(currentPathname);

  useOnClickOutside(navElementRef as RefObject<HTMLDivElement>, () =>
    onToggleDiscPanel(null)
  );

  return (
    <nav ref={navElementRef} id="nav-root">
      <ul id="nav-list" data-testid="nav-list" className="flex flex-col">
        <For each={sortedSegments}>
          {(segment) => (
            <NavigationPanelItem
              key={segment}
              segment={segment}
              panel={config.panels[segment]}
              isSelected={selectedRouteSegment === segment}
              isExpanded={expandedDiscPanel === segment}
              isMobileDevice={isMobileDevice}
              currentPath={currentPathname}
              onToggle={() => onToggleDiscPanel(segment)}
            />
          )}
        </For>
      </ul>
    </nav>
  );
}

function useSortedSegments(
  segments: NavSegments[],
  selectedRouteSegment: Nullable<NavSegments>,
  isMobileDevice: boolean
) {
  return sortWithActiveItem<NavSegments>({
    items: segments,
    isActive: (segment) => segment === selectedRouteSegment,
    move: {
      when: isMobileDevice,
      then: "start",
      else: "end",
    },
  });
}

interface NavigationPanelItemProps {
  segment: NavSegments;
  panel: NavigationConfig['panels'][NavSegments];
  isSelected: boolean;
  isExpanded: boolean;
  isMobileDevice: boolean;
  currentPath: string;
  onToggle: () => void;
}

function NavigationPanelItem({
  segment,
  panel,
  isSelected,
  isExpanded,
  isMobileDevice,
  currentPath,
  onToggle,
}: NavigationPanelItemProps) {
  return (
    <li id="nav-panel" data-segment={segment}>
      {isSelected ? (
        <SelectedPanel
          isMobileDevice={isMobileDevice}
          isSelected={isSelected}
          currentPath={currentPath}
          panel={panel}
        />
      ) : (
        <DisclosurePanel
          panel={panel}
          isExpanded={isExpanded}
          onToggle={onToggle}
        />
      )}
    </li>
  );
}
