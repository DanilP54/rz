'use client'

import { type FilterOptions, SEARCH_PARAMS, useTypeParams } from "@/features/rz/filters";
import { createFilterGroups } from "@/shared/lib/create-array-filter-groups";
import { FiltersGroupsLayout } from "../../filters/FiltersToggleGroupLayout";
import { FiltersToggleGroup } from "../../filters/FiltersToggleGroup";

export const options: Required<Pick<FilterOptions, 'type'>> = {
    type: [
        {
            label: 'по работам',
            value: SEARCH_PARAMS.BY_WORKS,
        },
        {
            label: 'по авторам',
            value: SEARCH_PARAMS.BY_CREATORS,
        },
    ],
}


export function InstinctsBooksFiltersBar() {

    const [type, updateType] = useTypeParams()

    const typeFilterGroups = createFilterGroups(options.type)

    return (
        <FiltersGroupsLayout>
            <FiltersToggleGroup
                filterGroups={typeFilterGroups}
                selectedValue={type}
                onSelect={(value) => {
                    updateType(value);
                }}
            />
        </FiltersGroupsLayout>
    );
}