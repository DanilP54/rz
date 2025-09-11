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
import Link from "next/link";
import { For } from "@/shared/For";

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

  const isOpenPreview = state === "preview";
  const isSelected = state === "selected";

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
        data-state={isOpenPreview ? "on" : "off"}
        aria-haspopup="true"
        aria-expanded={isOpenPreview}
        aria-controls="menu2"
        onClick={previewToggle}
        className={`${isSelected ? 'hidden' : 'block'} w-[35px] rounded-none cursor-pointer h-[40px] px-2 ${getBgColorOfSegment(
          segment
        )}`}
      >
        <ul role="menu" id="menu2" className={`${isOpenPreview ? 'flex' : 'hidden'} ${getBgColorOfSegment(segment)} flex-col justify-center gap-3 absolute top-0 left-[40px] right-2 z-50 shadow-lg text-white font-bold text-2xl px-4 py-1`}>
          <For each={panel.links}>
            {(link) => (
              <li role="none" key={link.label}>
                <Link
                  role="menuitem"
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  className="flex items-center h-full"
                >
                  {link.label}
                </Link>
              </li>
            )}
          </For>
        </ul>
      </Toggle>

      {isSelected && (
        <NavLinksSelected
          links={panel.links}
          segment={segment}
          pathname={pathname}
        />
      )}
    </div>
  );
}
