import { useEffect } from "react";
import { NavSegments } from "@/shared/model/routes";
import { toastHintManager } from "../lib/toast-hint-manager";
import { useHintsStorage } from "../lib/use-hints-storage";
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
    const id = ''
    // storage.save(selectedRouteSegment);
  }, [selectedRouteSegment, config.panels, storage, toast]);
}