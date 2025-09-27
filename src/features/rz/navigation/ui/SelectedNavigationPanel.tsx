import { getColorOfSegment } from "@/shared/lib/segment-bg-colors";
import Link from "next/link";
import { useEffect } from "react";
import { Panel as TPanel } from "../types";
import { For } from "@/shared/For";
import { toastHintManager } from "../lib/toastHintManager";
import { useHintsStorage } from "../lib/useHintsStorage";
import { sortWithActiveItem } from "../lib/sorting";

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
  
  const {segmentName, hintText, links} = panel
  const backgroundColor = getColorOfSegment(segmentName);

  const sortedLinks = sortWithActiveItem({
    items: links,
    active: {
      identifier: currentPath,
      getKey: (link) => link.href
    },
    move: {
      when: true,
      then: 'start',
      else: 'keep'
    }
  })

  useEffect(() => {
    if (storage.isSeen(segmentName)) return;
    let id = toast.show(hintText)
    storage.save(segmentName)
    return () => {
      if (id) toast.hide(id)
    };
  }, []);

  return (
    <div
      data-testid={`slc-panel-${segmentName}`}
      data-selected="true"
      className="group relative h-[40px]"
    >
      <ul
        className={`${backgroundColor} flex items-center justify-between gap-1 text-white font-bold w-full h-full border`}
      >
        <For each={sortedLinks}>
          {(link) => {
            const isActive = currentPath.includes(link.href);
            const ariaCurrentAttr = isActive ? 'page' : undefined
            return (
              <li
                key={link.href}
                className="w-full h-full flex items-center justify-center *:data-[active=true]:text-[20px] *:text-[9px]"
              >
                <Link
                  aria-current={ariaCurrentAttr}
                  data-active={isActive}
                  href={link.href}
                  className="data-[active=true]:text-black data-[active=true]:pb-[4px]"
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