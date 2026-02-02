import { useEffect } from "react";

import { toastHintManager } from "../lib/toast-hint-manager";
import { useHintsStorage } from "../lib/use-hints-storage";
import { NavigationConfig } from "../types";
import { Segment } from "@/common/api/client";

export function useNavigationHints(
  config: NavigationConfig,
  selectedRouteSegment: Nullable<Segment>
) {
  const storage = useHintsStorage();
  const toast = toastHintManager();

  useEffect(() => {
    // отвечает за отображение навигационных подсказок для панелей
    if (!selectedRouteSegment || storage.isSeen(selectedRouteSegment)) return;

    // const { hintText } = config.panels[selectedRouteSegment];
    const id = ''
    // storage.save(selectedRouteSegment);
  }, [selectedRouteSegment, config.panels, storage, toast]);
}