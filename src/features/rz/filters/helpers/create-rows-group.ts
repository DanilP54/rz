import { FilterOption } from "../types"



export function createRowOptions<T>(filters: FilterOption<T>[], rowLength: number = 2): FilterOption<T>[][] {
    const filterGroups: FilterOption<T>[][] = []
    for (let i = 0; i < filters.length; i += rowLength) {
        filterGroups.push(filters.slice(i, i + rowLength))
    }
    return filterGroups
}