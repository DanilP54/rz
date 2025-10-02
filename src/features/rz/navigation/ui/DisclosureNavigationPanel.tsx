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
  const segment = panel.segmentName;
  const linksList = panel.links;
  const bgColorPanel = getColorOfSegment(segment);
  const isVisibleClassName = isExpanded ? "flex" : "hidden";

  return (
    <div
      data-testid={`disc-panel-${segment}`}
      className="group relative h-[40px]"
    >
      <button
        data-testid={`disc-trigger-${segment}`}
        type="button"
        aria-expanded={isExpanded}
        aria-controls={`nav-dropdown-menu-${segment}`}
        onClick={onToggle}
        className={`w-[35px] rounded-none cursor-pointer h-[40px] px-2 ${bgColorPanel}`}
      ></button>
      <ul
        data-testid={`disc-link-list-${segment}`}
        className={`${isVisibleClassName} ${bgColorPanel} flex-col justify-center gap-3 absolute top-0 left-[40px] right-2 z-50 shadow-lg text-white font-bold text-3xl`}
      >
        <For each={linksList}>
          {({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center h-full w-full px-5"
              >
                {label}
              </Link>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
