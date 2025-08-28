'use client'

import { type FilterOptions, PARAMS, useCategoryParams, useTypeParams } from "@/features/rz/filters";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";

export const options: Required<FilterOptions> = {
    category: [
        {
            label: 'эстетика',
            value: PARAMS.AESTHETICS,
        },
        {
            label: 'самовыражение',
            value: PARAMS.SELFEXPRESSION,
        },
    ],
    type: [
        {
            label: 'по работам',
            value: PARAMS.BY_WORKS,
        },
        {
            label: 'по авторам',
            value: PARAMS.BY_CREATORS,
        },
    ],
}


export function InstinctsMovieFiltersBar() {

    const [category, updateCategory] = useCategoryParams()
    const [type, updateType] = useTypeParams()

    return (
        <div className="group-data-[segment='instincts']/filters:bg-instincts/30 w-full h-full">
            <ToggleGroup type="single" className="flex justify-center h-full items-center *:text-[13px] border-none w-full *:h-full rounded-none">
                <ToggleGroupItem value="1" className="border-none data-[state=on]:bg-instincts/80 cursor-pointer">эстетика</ToggleGroupItem>
                <ToggleGroupItem value="2" className="border-none data-[state=on]:bg-instincts/80 cursor-pointer">самовыражение</ToggleGroupItem>
            </ToggleGroup>
        </div>
    );
}