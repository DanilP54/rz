import { getBgColorOfSegment } from "@/shared/lib/segment-bg-colors";
import Link from "next/link";
import { useEffect } from "react";
import { Panel as TPanel } from "../types";
import { For } from "@/shared/For";

export function SelectedNavigationPanel({
    panel,
    pathname,
    onShowHint,
    onHideHint,
    onSaveHint,
    isSeenHint,
  }: {
    panel: TPanel;
    pathname: string;
    isSeenHint: boolean;
    onShowHint: () => string | number;
    onHideHint: (id: string | number) => void
    onSaveHint: () => void 
  }) {
    const background_color = getBgColorOfSegment(panel.name);
  
    useEffect(() => {
      if (isSeenHint) return;
      onSaveHint()
      let id = onShowHint()
  
      return () => {
        if (id) onHideHint(id)
      };
    }, []);
  
    return (
      <div data-selected="true" className="group relative h-[40px]">
        <ul
          aria-label="Rodnaya Zemlya"
          data-testid={`${panel.name}-selected`}
          id="nav-selected"
          className={`${background_color} flex items-center justify-between gap-1 text-white font-bold w-full h-full border`}
        >
          <For each={panel.links}>
            {(link) => {
              const isActive = pathname.includes(link.href);
              return (
                <li
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
              );
            }}
          </For>
        </ul>
      </div>
    );
  }