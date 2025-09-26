import { getColorOfSegment } from "@/shared/lib/segment-bg-colors";
import Link from "next/link";
import { useEffect } from "react";
import { Panel as TPanel } from "../types";
import { For } from "@/shared/For";
import { toastHintManager } from "../lib/toastHintManager";
import { useHintsStorage } from "../lib/useHintsStorage";

export function SelectedNavigationPanel({
  panel,
  isSelected,
  currentPath,
}: {
  panel: TPanel;
  isSelected?: boolean;
  currentPath: string;
}) {

  const toast = toastHintManager();
  const storage = useHintsStorage()
  const backgroundColor = getColorOfSegment(panel.segmentName);

  useEffect(() => {
    if (storage.isSeen(panel.segmentName)) return;
    let id = toast.show(panel.hintText)
    storage.save(panel.segmentName)
    return () => {
      if (id) toast.hide(id)
    };
  }, []);

  return (
    <div
      data-testid={`slc-panel-${panel.segmentName}`}
      data-selected="true"
      className="group relative h-[40px]"
    >
      <ul
        className={`${backgroundColor} flex items-center justify-between gap-1 text-white font-bold w-full h-full border`}
      >
        <For each={panel.links}>
          {(link) => {
            const isActive = currentPath.includes(link.href);
            return (
              <li
                key={link.href}
                className="w-full h-full flex items-center justify-center *:data-[active=true]:text-[20px] *:text-[9px]"
              >
                <Link
                  aria-current={isActive ? 'page' : undefined}
                  data-active={isActive}
                  href={link.href}
                  className="order-1 data-[active=true]:order-0 data-[active=true]:text-black data-[active=true]:pb-[4px]"
                >
                  {link.label}
                </Link>
              </li>
            );
          }}
        </For>
      </ul>
    </div>
  );
}