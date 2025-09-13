import { For } from "@/shared/For";
import { getColorOfSegment } from "@/shared/lib/segment-bg-colors";
import Link from "next/link";
import { Panel as TPanel } from "../types";

export function DesclosureNavigationPanel({
  panel,
  isExpanded,
  onToggle,
}: {
  isExpanded: boolean;
  panel: TPanel;
  onToggle: () => void;
}) {
  const bgColorPanel = getColorOfSegment(panel.name);

  return (
    <div className="group relative h-[40px]">
      <button
        id=""
        type="button"
        data-segment={panel.name}
        aria-expanded={isExpanded}
        aria-controls="rz-navigation-panel"
        onClick={onToggle}
        className={`w-[35px] rounded-none cursor-pointer h-[40px] px-2 ${bgColorPanel}`}
      ></button>
      <ul
        id="rz-navigation-panel"
        className={`${isExpanded ? "flex" : "hidden"
          } ${bgColorPanel} flex-col justify-center gap-3 absolute top-0 left-[40px] right-2 z-50 shadow-lg text-white font-bold text-2xl`}
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