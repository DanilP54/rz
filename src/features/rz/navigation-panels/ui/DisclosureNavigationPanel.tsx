import { For } from "@/shared/For";
import { getColorOfSegment } from "@/shared/lib/segment-bg-colors";
import Link from "next/link";
import { Panel as TPanel } from "../types";

export function DisclosureNavigationPanel({
  panel,
  isExpanded,
  onToggle,
}: {
  isExpanded: boolean;
  panel: TPanel;
  onToggle: () => void;
}) {
  const bgColorPanel = getColorOfSegment(panel.segment);

  return (
    <div 
      data-testid={`disc-panel-${panel.segment}`}
      className="group relative h-[40px]">
      <button
        data-testid={`disc-trigger-${panel.segment}`}
        type="button"
        aria-expanded={isExpanded}
        aria-controls={`nav-dropdown-menu-${panel.segment}`}
        onClick={onToggle}
        className={`w-[35px] rounded-none cursor-pointer h-[40px] px-2 ${bgColorPanel}`}
      ></button>
      <ul
        data-testid={`disc-link-list-${panel.segment}`}
        className={`${isExpanded ? "flex" : "hidden"} ${bgColorPanel} flex-col justify-center gap-3 absolute top-0 left-[40px] right-2 z-50 shadow-lg text-white font-bold text-2xl`}
      >
        <For each={panel.links}>
          {(link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex items-center h-full w-full px-4"
              >
                {link.label}
              </Link>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}