import { FilterOption } from "./types"

export function createRowsFilterGroup<T>(filters: FilterOption<T>[],groupLength: number = 2): FilterOption<T>[][] {
    const filterGroups: FilterOption<T>[][] = []
    for (let i = 0; i < filters.length; i += groupLength) {
        filterGroups.push(filters.slice(i, i + groupLength))
    }
    return filterGroups
}