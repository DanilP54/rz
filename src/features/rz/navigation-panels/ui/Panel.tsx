import React, { RefObject, useEffect, useRef } from "react";
import { useHintsStorage } from "../lib/useHintsStorage";
import { Panel as TPanel } from "../types";
import { useOnClickOutside } from "usehooks-ts";
import {
  NavLinksPreview,
  NavLinksSelected,
} from "@/features/rz/navigation-panels/ui/NavLinks";
import { usePathname } from "next/navigation";
import { toastHintManager } from "@/features/rz/navigation-panels/lib/toastHintManager";
import { RZ_SEGMENTS } from "@/shared/model/routes";
import { ToggleButton } from "@/features/rz/navigation-panels/ui/Toggle";

type PanelState = "selected" | "preview" | "closed";

interface IPanel {
  state: PanelState;
  segment: RZ_SEGMENTS;
  panel: TPanel;
  previewToggle: () => void;
  handleClosePreview: () => void;
}

export function Panel({
  state,
  panel,
  previewToggle,
  segment,
  handleClosePreview,
}: IPanel) {
  const pathname = usePathname();
  const storage = useHintsStorage();
  const toast = toastHintManager();
  const previewRef = useRef<Nullable<HTMLElement>>(null);

  useEffect(() => {
    if (storage.isSeen(segment)) return;

    let hintId: Option<string | number>;

    if (state === "selected") {
      storage.save(segment);
      hintId = toast.show(panel.description);
    }

    return () => {
      if (hintId) toast.hide(hintId);
    };
  }, [state]);

  useOnClickOutside(previewRef as RefObject<HTMLElement>, () =>
    handleClosePreview()
  );

  return (
    <div
      id={`${segment} panel`}
      data-testid={`${segment}-panel`}
      data-selected={state === "selected"}
      data-preview={state === "preview"}
      className={`group relative order-1 data-[selected=true]:order-0`}
    >
      <ToggleButton onToggle={previewToggle} segment={segment}>
        {state === "preview" && (
          <NavLinksPreview
            links={panel.links}
            segment={segment}
            ref={previewRef}
          />
        )}
        {state === "selected" && (
          <NavLinksSelected
            links={panel.links}
            segment={segment}
            pathname={pathname}
          />
        )}
      </ToggleButton>
    </div>
  );
}
