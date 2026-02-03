import { For } from "@/common/For";
import { getColorOfSegment } from "@/common/lib/segment-bg-colors";
import Link from "next/link";
import { NavLink, Panel } from "../types";
import { Segment } from "@/common/api/client";

export function DisclosurePanel({
  segmentName,
  isExpanded,
  onToggle,
  links,
}: {
  isExpanded: boolean;
  segmentName: Segment;
  onToggle: (segmentName: Segment) => void;
  links: NavLink[];
}) {
  const segment = segmentName;
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
        onClick={() => onToggle(segmentName)}
        className={`w-[35px] rounded-none cursor-pointer h-[40px] px-2 ${bgColorPanel}`}
      />
      <ul
        data-testid={`disc-link-list-${segment}`}
        className={`${isVisibleClassName} ${bgColorPanel} flex-col justify-center gap-3 absolute top-0 left-[40px] right-2 z-50 shadow-lg text-white font-bold text-3xl`}
      >
        <Links links={links} />
      </ul>
    </div>
  );
}



const Links = ({ links }: { links: NavLink[] }) => {
  return (
    <>
      {links.map(link => (
        <Link
          href={link.href}
          className="flex items-center h-full w-full px-5"
        >
          {link.label}
        </Link>
      ))}
    </>
  )
}