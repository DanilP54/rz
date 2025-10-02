'use client'

import { type FilterOptions, PARAMS, useCategoryParams, useTypeParams } from "@/features/rz/filters";
import { createFilterGroups } from "@/shared/lib/create-array-filter-groups";
import { FiltersGroupsLayout } from "../../filters/FiltersToggleGroupLayout";
import { FiltersToggleGroup } from "../../filters/FiltersToggleGroup";


export const options: Required<FilterOptions> = {
    category: [
        {
            label: 'эстетика',
            value: PARAMS.AESTHETICS,
        },
        {
            label: 'самовыражение',
            value: PARAMS.SELFEXPRESSION,
        }
    ],
    type: [
        {
            label: 'по работам',
            value: PARAMS.BY_WORKS,
        },
        {
            label: 'по авторам',
            value: PARAMS.BY_CREATORS,
        }
    ],
}


export function InstinctsMusicFiltersBar() {

    const [category, updateCategory] = useCategoryParams()
    const [type, updateType] = useTypeParams()

    const categoryFilterGroups = createFilterGroups(options.category)
    const typeFilterGroups = createFilterGroups(options.type)


    const onSelectCategory = (value: string) => {
        if (!value) updateType('')
        updateCategory(value)
    }

    return (
        <FiltersGroupsLayout>
            <FiltersToggleGroup
                filterGroups={categoryFilterGroups}
                selectedValue={category}
                onSelect={(value) => onSelectCategory(value)}
            />
            {category && <FiltersToggleGroup
                filterGroups={typeFilterGroups}
                selectedValue={type}
                onSelect={updateType}
                indentLeft={categoryFilterGroups.length}
            />}
        </FiltersGroupsLayout>
    )
}
