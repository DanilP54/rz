import { FilterOption } from "./filter-options"


export function createRowChunks<T>(filters: FilterOption<T>[], chunkLength: number = 2): FilterOption<T>[][] {
    const filterGroups: FilterOption<T>[][] = []
    for (let i = 0; i < filters.length; i += chunkLength) {
        filterGroups.push(filters.slice(i, i + chunkLength))
    }
    return filterGroups
}