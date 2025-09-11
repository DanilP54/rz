import React, { RefObject, useEffect, useRef } from "react";
import { useHintsStorage } from "../lib/useHintsStorage";
import { Panel as TPanel } from "../types";
import { useOnClickOutside } from "usehooks-ts";
import { usePathname } from "next/navigation";
import { toastHintManager } from "@/features/rz/navigation-panels/lib/toastHintManager";
import { RZ_SEGMENTS } from "@/shared/model/routes";
import { Toggle } from "@/shared/ui/toggle";
import { getBgColorOfSegment } from "@/shared/lib/segment-bg-colors";
import Link from "next/link";
import { For } from "@/shared/For";

type PanelState = "selected" | "preview" | "closed";

interface INavigationPanel {
  state: PanelState;
  segment: RZ_SEGMENTS;
  panel: TPanel;
  previewToggle: () => void;
  handleClosePreview: () => void;
}

export function NavigationPanel({
  state,
  panel,
  previewToggle,
  segment,
  handleClosePreview,
}: INavigationPanel) {
  const pathname = usePathname();
  const storage = useHintsStorage();
  const toast = toastHintManager();
  const previewRef = useRef<Nullable<HTMLElement>>(null);

  const isPreview = state === "preview";
  const isSelected = state === "selected";

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
      className={`group relative order-1 data-[selected=true]:order-0 h-[40px]`}
    >
      {!isSelected && <DisclosureNavigationMenu panel={panel} isPreview={isPreview} onToggle={previewToggle}/>}
      {isSelected && <NavigationMenu panel={panel} pathname={pathname} />}
    </div>
  );
}

function DisclosureNavigationMenu({
  panel,
  isPreview,
  onToggle,
}: {
  panel: TPanel;
  isPreview: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <Toggle
        aria-label={`show navigation menu ${panel.name} segment`}
        data-pressed={isPreview}
        aria-expanded={isPreview}
        data-state={isPreview ? "on" : "off"}
        aria-haspopup="true"
        aria-controls="menu-list"
        onClick={onToggle}
        className={`w-[35px] rounded-none cursor-pointer h-[40px] px-2 ${getBgColorOfSegment(
          panel.name
        )}`}
      >
        <ul
          tabIndex={-1}
          aria-label="rz navigation menu"
          id="menu-list"
          className={`${isPreview ? "flex" : "hidden"} ${getBgColorOfSegment(
            panel.name
          )} flex-col justify-center gap-3 absolute top-0 left-[40px] right-2 z-50 shadow-lg text-white font-bold text-2xl px-4 py-1`}
        >
          <For each={panel.links}>
            {(link) => (
              <li key={link.label}>
                <Link
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
    </>
  );
}

function NavigationMenu({
  panel,
  pathname,
}: {
  panel: TPanel;
  pathname: string;
}) {
  return (
    <ul
      aria-label="Rodnaya Zemlya"
      data-testid={`${panel.name}-selected`}
      id="nav-selected"
      className={`${getBgColorOfSegment(
        panel.name
      )} flex items-center justify-between gap-1 text-white font-bold w-full h-full border`}
    >
      <For each={panel.links}>
        {(link) => {
          const isActive = pathname.includes(link.href)
          return <li
            key={link.href}
            className="w-full h-full flex items-center justify-center *:data-[active=true]:text-[20px] *:text-[9px]"
          >
            <Link
              aria-current={isActive}
              data-active={isActive}
              href={link.href}
              prefetch={false}
              className="order-1  data-[active=true]:order-0 data-[active=true]:text-black data-[active=true]:pb-[4px]"
            >
              {link.label}
            </Link>
          </li>
        }}
      </For>
    </ul>
  );
}
