import { Ref } from "react";
import { getBgColorOfSegment } from "@/shared/lib/segment-bg-colors";
import { For } from "@/shared/For";
import Link from "next/link";
import { NavLinks } from "@/features/rz/navigation-panels/types";
import { RZ_SEGMENTS } from "@/shared/model/routes";

interface INavLinksProps {
  links: NavLinks;
  segment: RZ_SEGMENTS;
}

interface INavLinksPreviewProps extends INavLinksProps {
  ref: Ref<HTMLElement>;
}

export function NavLinksPreview({
  links,
  segment,
  ref,
}: INavLinksPreviewProps) {
  return (
    <nav
      ref={ref}
      id="nav-preview"
      className={`${getBgColorOfSegment(
        segment
      )} flex flex-col justify-center gap-3 absolute top-0 left-[40px] right-2 z-50 shadow-lg text-white font-bold text-2xl px-4 py-1`}
    >
      <For each={links}>
        {(link) => (
          <Link
            key={link.href}
            href={link.href}
            prefetch={false}
            className="flex items-center h-full"
          >
            {link.label}
          </Link>
        )}
      </For>
    </nav>
  );
}

interface INavLinksSelectedProps extends INavLinksProps {
  pathname: string;
}

export function NavLinksSelected({
  links,
  pathname,
  segment,
}: INavLinksSelectedProps) {
  return (
    <ul
      aria-label="Rodnaya Zemlya"
      data-testid={`${segment}-selected`}
      id="nav-selected"
      className={`${getBgColorOfSegment(
        segment
      )} flex items-center justify-between gap-1 text-white font-bold w-full h-full border`}
    >
      <For each={links}>
        {(link) => (
          <li key={link.href} className="w-full h-full flex items-center justify-center *:data-[active=true]:text-[20px] *:text-[9px]">
            <Link
              data-active={pathname.includes(link.href)}
              href={link.href}
              prefetch={false}
              className="order-1  data-[active=true]:order-0 data-[active=true]:text-black data-[active=true]:pb-[4px]"
            >
              {link.label}
            </Link>
          </li>
        )}
      </For>
    </ul>
  );
}
