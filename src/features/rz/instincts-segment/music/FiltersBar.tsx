// 'use client'

// import { type FilterOptions, SEARCH_PARAMS, useCategoryParams, useTypeParams } from "@/features/rz/filters";
// import { createFilterGroups } from "@/shared/lib/create-array-filter-groups";
// import { FiltersGroupsLayout } from "@/features/rz/filters/FiltersToggleGroupLayout";
// import { FiltersToggleGroup } from "@/features/rz/filters/FiltersToggleGroup";


// export const options: Required<FilterOptions> = {
//     category: [
//         {
//             label: 'эстетика',
//             value: SEARCH_PARAMS.AESTHETICS,
//         },
//         {
//             label: 'самовыражение',
//             value: SEARCH_PARAMS.SELFEXPRESSION,
//         }
//     ],
//     type: [
//         {
//             label: 'по работам',
//             value: SEARCH_PARAMS.BY_WORKS,
//         },
//         {
//             label: 'по авторам',
//             value: SEARCH_PARAMS.BY_CREATORS,
//         }
//     ],
// }


// interface InstinctsMusicFiltersBar {
//     options: {}
// }

// export function InstinctsMusicFiltersBar({ options }: InstinctsMusicFiltersBar) {

//     const [category, updateCategory] = useCategoryParams()
//     const [type, updateType] = useTypeParams()

//     const categoryFilterGroups = createFilterGroups(options.category)
//     const typeFilterGroups = createFilterGroups(options.type)


//     const onSelectCategory = (value: string) => {
//         if (!value) updateType('')
//         updateCategory(value)
//     }

//     return (
//         <FiltersGroupsLayout>
//             <FiltersToggleGroup
//                 filterGroups={categoryFilterGroups}
//                 selectedValue={category}
//                 onSelect={(value) => onSelectCategory(value)}
//             />
//             {category && <FiltersToggleGroup
//                 filterGroups={typeFilterGroups}
//                 selectedValue={type}
//                 onSelect={updateType}
//                 offsetRow={categoryFilterGroups.length}
//             />}
//         </FiltersGroupsLayout>
//     )
// }
