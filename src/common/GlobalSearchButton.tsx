import { Search } from "lucide-react";

export function GlobalSearchButton() {

    return (
        <button id='globalsearch' aria-label="global search" className={`
            border-[1px] rounded-xs flex py-0 px-2 gap-2 font-medium shadow-sm
            items-center justify-start backdrop-blur-3xl h-9 cursor-pointer
            [&_svg:not([class*='stroke-'])]:stroke-3 [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 
            border-neutral-300 dark:border-neutral-700 w-full 
            text-neutral-400 dark:text-neutral-500 
            bg-neutral-300/40 dark:bg-neutral-800/40
        `}>
            <Search />
            <span className="pt-[1.8px]">Поиск</span>
        </button>
    )
}