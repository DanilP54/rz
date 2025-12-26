"use client";
import { Segment } from "@/common/api/gen";
import type { OptionsBySearchParams } from "../options/type";
import { FiltersGroupsLayout } from "./filters-group.layout";
import { createRowOptions } from "../lib/create-row.options";
import { FiltersToggleGroup } from "./filters-group.toggle";
import { reatomComponent } from "@reatom/react";
import { catalogFilters } from "../model/search-params.model";
import { wrap } from "@reatom/core";

interface FiltersBarProps {
  segment: Segment;
  isMobileDevice?: boolean;
  options: OptionsBySearchParams;
}

export const FiltersBar = reatomComponent(
  ({ segment, options, isMobileDevice }: FiltersBarProps) => {

    const filters = catalogFilters()

    const topicRowChunks = createRowOptions(
      options.topic,
      isMobileDevice ? 4 : 2
    );
    const modeRowChunks = createRowOptions(
      options.mode,
      isMobileDevice ? 4 : 2
    );


    return (
      <div
        data-segment={segment}
        className={`group/filters w-3/4 absolute top-[164px] sm:top-[106px] right-0 flex`}
      >
        <FiltersGroupsLayout>
          <FiltersToggleGroup
            selectedValue={filters.topic}
            rowChunks={topicRowChunks}
            onSelect={wrap((value) =>
              catalogFilters.update({
                topic: value,
              })
            )}
          />
          {filters.topic && (
            <FiltersToggleGroup
              selectedValue={filters.mode}
              rowChunks={modeRowChunks}
              onSelect={wrap((value) =>
                catalogFilters.update({
                  mode: value,
                })
              )}
              offsetRow={topicRowChunks.length}
            />
          )}
        </FiltersGroupsLayout>
      </div>
    );
  })

