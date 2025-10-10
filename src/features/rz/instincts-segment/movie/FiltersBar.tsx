"use client";

import {
  type FilterOptions,
  SEARCH_PARAMS,
  useCategoryParams,
  useTypeParams,
} from "@/features/rz/filters";
import { FiltersGroupsLayout } from "../../filters/FiltersToggleGroupLayout";
import { FiltersToggleGroup } from "../../filters/FiltersToggleGroup";
import { createFilterGroups } from "@/shared/lib/create-array-filter-groups";

export const options: Required<FilterOptions> = {
  category: [
    {
      label: "эстетика",
      value: SEARCH_PARAMS.AESTHETICS,
    },
    {
      label: "самовыражение",
      value: SEARCH_PARAMS.SELFEXPRESSION,
    },
    {
      label: "концерты",
      value: SEARCH_PARAMS.CONCERTS,
    },
  ],
  type: [
    {
      label: "по работам",
      value: SEARCH_PARAMS.BY_WORKS,
    },
    {
      label: "по авторам",
      value: SEARCH_PARAMS.BY_CREATORS,
    },
  ],
};

export function InstinctsMovieFiltersBar() {
  const [category, updateCategory] = useCategoryParams();
  const [type, updateType] = useTypeParams();

  const categoryFilterGroups = createFilterGroups(options.category, 3)
  const typeFilterGroups = createFilterGroups(options.type)

  return (
    <FiltersGroupsLayout>
      <FiltersToggleGroup
        filterGroups={categoryFilterGroups}
        selectedValue={category}
        onSelect={(value) => {
          if (!value) {
            updateType("");
          }
          updateCategory(value);
        }}
      />
      {category && (
        <FiltersToggleGroup
          filterGroups={typeFilterGroups}
          selectedValue={type}
          onSelect={updateType}
          offsetRow={categoryFilterGroups.length}
        />
      )}
    </FiltersGroupsLayout>
  );
}
