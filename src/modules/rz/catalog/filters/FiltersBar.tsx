"use client";

import type { OptionsBySearchParams } from "./options/type";
import type { Segment } from "@/common/api/client";
import { useStore } from "@nanostores/react";
import { $catalogFilters } from "./model/model";
import { createRowOptions } from "./lib/create-row-options";
import { FiltersGroupsLayout } from "./FiltersGroupLayout";
import { FiltersToggleGroup } from "./FiltersGroupToggle";


interface FiltersBarProps {
  segment: Segment;
  isMobileDevice?: boolean;
  options: OptionsBySearchParams;
}

export const FiltersBar = ({ segment, options, isMobileDevice }: FiltersBarProps) => {

  const filters = useStore($catalogFilters.$values);

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
          onSelect={(value) => {
            $catalogFilters.update('topic', value);
          }}
        />
        {filters.topic && (
          <FiltersToggleGroup
            selectedValue={filters.mode}
            rowChunks={modeRowChunks}
            onSelect={(value) => {
              $catalogFilters.update('mode', value);
            }}
            offsetRow={topicRowChunks.length}
          />
        )}
      </FiltersGroupsLayout>
    </div>
  );
}

