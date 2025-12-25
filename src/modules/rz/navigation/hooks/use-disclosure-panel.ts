import { useState, useEffect } from "react";
import { NavSegments } from "@/shared/model/routes";

export function useDisclosurePanel(currentPathname: string) {
  const [expandedDiscPanel, setExpandedDiscPanel] = useState<NavSegments | null>(null);

  useEffect(() => {
    setExpandedDiscPanel(null);
  }, [currentPathname]);

  const onToggleDiscPanel = (segment: NavSegments | null) => {
    if (segment === null) {
      setExpandedDiscPanel(null);
      return;
    }
    setExpandedDiscPanel((prev) => (prev === segment ? null : segment));
  };

  return {
    expandedDiscPanel,
    onToggleDiscPanel,
  };
}