export function createFilterGroups<T extends unknown[]>(filters: T, groupLength: number = 2) {
    const filterGroups: Array<T[number][]> = []
    for (let i = 0; i < filters.length; i += groupLength) {
        filterGroups.push(filters.slice(i, i + groupLength))
    }
    return filterGroups
}