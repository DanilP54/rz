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
import { Toggle } from "@/shared/ui/toggle";
import { getBgColorOfSegment } from "@/shared/lib/segment-bg-colors";

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

  const isOpenPreview = state === 'preview'

  return (
    <div
      id={`${segment} panel`}
      data-testid={`${segment}-panel`}
      data-selected={state === "selected"}
      data-preview={state === "preview"}
      className={`group relative order-1 data-[selected=true]:order-0 h-[40px]`}
    >
      <Toggle
        data-pressed={isOpenPreview}
        data-state={isOpenPreview ? 'on' : 'off'}
        aria-haspopup="true"
        aria-expanded={isOpenPreview}
        aria-controls="menu"
        onClick={previewToggle}
        className={`w-[35px] rounded-none cursor-pointer h-[40px] px-2 ${getBgColorOfSegment(segment)}`}
      >
        {state === "preview" && (
          <NavLinksPreview
            links={panel.links}
            segment={segment}
            ref={previewRef}
          />
        )}
      </Toggle>

      {state === "selected" && (
        <NavLinksSelected
          links={panel.links}
          segment={segment}
          pathname={pathname}
        />
      )}
      {/* <ToggleButton onToggle={previewToggle} segment={segment}>
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
      </ToggleButton> */}
    </div>
  );
}
