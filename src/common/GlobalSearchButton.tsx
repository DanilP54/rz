"use client"
import { Search } from "lucide-react";
import { useSelectedLayoutSegment } from "next/navigation";
import { Segment } from "@/common/api/gen";

export function GlobalSearchButton() {
  const segment = useSelectedLayoutSegment() as Segment | null
  const hasSegment = !!segment;
  return (
    <button id='globalsearch' aria-label="global search" className={`
            rounded-xs flex py-0 px-2 gap-2 font-medium shadow-sm
            items-center justify-start backdrop-blur-3xl h-9 cursor-pointer
            [&_svg:not([class*='stroke-'])]:stroke-3 [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 
            w-full
            ${hasSegment ? 'text-black/50 bg-black/10 border-black/10' : 'border-neutral-300 dark:border-neutral-700 text-neutral-400 dark:text-neutral-500 bg-neutral-300/40 dark:bg-neutral-800/40'}
        `}>
            <Search />
            <span className="pt-[1.8px]">Поиск</span>
        </button>
    )
}