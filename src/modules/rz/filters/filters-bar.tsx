"use client";
import { NavSegments, SegmentCategory } from "@/common/model/routes";

import { FiltersToggleGroup } from "./ui/FiltersToggleGroup";
import { FiltersGroupsLayout } from "./ui/FiltersToggleGroupLayout";
import { createRowOptions } from "./helpers/create-rows-group";

import { useTopicParams } from "./hooks/use-topic-params";
import { useModeParams } from "./hooks/use-mode-params";
import { useVisibleRules } from "./hooks/use-visible-rules";
import { useAutoResetFilters } from "./hooks/use-auto-reset-filters";
import { FilterOptionsByParams, FiltersRules } from "./types";
import { useFiltersTransition } from "./providers/use-filters-transition";

interface IFiltersBar {
  segment: NavSegments;
  category: SegmentCategory<NavSegments>;
  isMobileDevice?: boolean;
  rules: FiltersRules;
  options: Readonly<FilterOptionsByParams>;
}

export function FiltersBar({
  segment,
  category,
  rules,
  options,
  isMobileDevice,
}: IFiltersBar) {
  
  const { startTransition } = useFiltersTransition();

  const [topic, updateTopic] = useTopicParams({
    shallow: false,
    startTransition,
  });

  const [mode, updateMode] = useModeParams({
    shallow: false,
    startTransition,
  });

  const visibleRule = useVisibleRules(rules, { topic, mode });

  useAutoResetFilters(
    rules,
    { topic, mode },
    { topic: updateTopic, mode: updateMode }
  );

  const topicRowChunks = createRowOptions(options.topic, isMobileDevice ? 4 : 2);
  const viewRowChunks = createRowOptions(options.mode, isMobileDevice ? 4 : 2);

  return (
    <div
      data-segment={segment}
      className={`group/filters w-3/4 absolute top-[164px] sm:top-[106px] right-0 flex`}
    >
      <FiltersGroupsLayout>
        {visibleRule.topic && (
          <FiltersToggleGroup
            selectedValue={topic}
            rowChunks={topicRowChunks}
            onSelect={updateTopic}
          />
        )}
        {visibleRule.mode && (
          <FiltersToggleGroup
            selectedValue={mode}
            rowChunks={viewRowChunks}
            onSelect={updateMode}
            offsetRow={topicRowChunks.length}
          />
        )}

      </FiltersGroupsLayout>
    </div>
  );
}
