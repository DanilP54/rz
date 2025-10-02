import { getColorOfSegment } from "@/shared/lib/segment-bg-colors";
import Link from "next/link";
import { Panel as TPanel, NavLink } from "../types";
import { For } from "@/shared/For";
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

  const {segmentName, links} = panel
  const backgroundColor = getColorOfSegment(segmentName);

  const sortedLinks = sortWithActiveItem<NavLink>({
    items: links,
    isActive: (link) => link.href === currentPath,
    move: {
      when: true,
      then: 'start',
      else: 'keep'
    }
  })

  return (
    <div
      data-testid={`slc-panel-${segmentName}`}
      data-selected={isSelected ? 'true' : undefined}
      className="group relative h-[40px]"
    >
      <ul
        className={`${backgroundColor} flex items-center justify-between gap-1 text-white font-bold w-full h-full border`}
      >
        <For each={sortedLinks}>
          {(link) => {
            const isActive = currentPath.includes(link.href);
            const ariaCurrentAttribute = isActive ? 'page' : undefined
            return (
              <li
                key={link.href}
                className="w-full h-full flex items-center justify-center *:data-[active=true]:text-[20px] *:text-[9px]"
              >
                <Link
                  aria-current={ariaCurrentAttribute}
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