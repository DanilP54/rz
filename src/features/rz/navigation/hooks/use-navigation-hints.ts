import { useEffect } from "react";
import { NavSegments } from "@/shared/model/routes";
import { toastHintManager } from "../lib/_toast-hint-manager";
import { useHintsStorage } from "../lib/_use-hints-storage";
import { NavigationConfig } from "../types";

export function useNavigationHints(
  config: NavigationConfig,
  selectedRouteSegment: Nullable<NavSegments>
) {
  const storage = useHintsStorage();
  const toast = toastHintManager();

  useEffect(() => {
    // отвечает за отображение навигационных подсказок для панелей
    if (!selectedRouteSegment || storage.isSeen(selectedRouteSegment)) return;
    
    const { hintText } = config.panels[selectedRouteSegment];
    const id = toast.show(hintText);
    storage.save(selectedRouteSegment);

    return () => {
      if (id) toast.hide(id);
    };
  }, [selectedRouteSegment, config.panels, storage, toast]);
}