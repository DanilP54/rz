"use client";

import {
  type FilterOptions,
  PARAMS,
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
      value: PARAMS.AESTHETICS,
    },
    {
      label: "самовыражение",
      value: PARAMS.SELFEXPRESSION,
    },
    {
      label: "концерты",
      value: PARAMS.CONCERTS,
    },
  ],
  type: [
    {
      label: "по работам",
      value: PARAMS.BY_WORKS,
    },
    {
      label: "по авторам",
      value: PARAMS.BY_CREATORS,
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
          indentLeft={categoryFilterGroups.length}
        />
      )}
    </FiltersGroupsLayout>
  );
}
