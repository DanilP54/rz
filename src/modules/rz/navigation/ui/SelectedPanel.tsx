import { getColorOfSegment } from "@/common/lib/segment-bg-colors";
import Link from "next/link";
import { For } from "@/common/For";

import { NavLink, Panel } from "../types";
import { sortWithActiveItem } from "../lib/sort-active-item";
import { Segment } from "@/common/api/client";
import { usePathname } from "next/navigation";

interface ISelectedPanel {
  segmentName: Segment;
  isSelected?: boolean;
  isMobileDevice: boolean;
  links: NavLink[];
}

export function SelectedPanel({
  segmentName,
  isSelected,
  isMobileDevice = true,
  links,
}: ISelectedPanel) {

  const backgroundColor = getColorOfSegment(segmentName);
  const pathname = usePathname()

  const sortedLinks = sortWithActiveItem<NavLink>({
    items: [],
    isActive: (link) => link.href === pathname,
    move: {
      when: isMobileDevice,
      then: "start",
      else: "keep",
    },
  });

  return (
    <div
      data-testid={`slc-panel-${segmentName}`}
      data-selected={isSelected ? "true" : undefined}
      className="group relative h-[40px]"
    >
      <ul
        className={`${backgroundColor} flex items-center justify-between gap-1 text-white font-bold w-full h-full`}
      >
        <For each={links}>
          {(link) => {
            const isActive = pathname.includes(link.href);
            const ariaCurrentAttribute = isActive ? "page" : undefined;
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
