"use client";
import React from "react";
import { NavSegments, SegmentCategory } from "@/shared/model/routes";

import { FiltersToggleGroup } from "./ui/FiltersToggleGroup";
import { FiltersGroupsLayout } from "./ui/FiltersToggleGroupLayout";
import { createRowOptions } from "./helpers/create-rows-group";

import { useTopicParams } from "./hooks/use-topic-params";
import { useViewParams } from "./hooks/use-view-params";
import { useVisibleRules } from "./hooks/use-visible-rules";
import { useAutoResetFilters } from "./hooks/use-auto-reset-filters";
import { useContextCus } from "@/app/rz/(page-contents)/[segment]/[category]/prov";
import { getFilters } from "./config/config";

interface IFiltersBar {
  segment: NavSegments;
  category: SegmentCategory<NavSegments>;
  isMobileDevice?: boolean;
}

export function FiltersBar({ segment, category, isMobileDevice }: IFiltersBar) {
  const { startTransition } = useContextCus();

  const [topic, updateTopic] = useTopicParams({
    shallow: false,
    startTransition,
  });

  const [view, updateView] = useViewParams({
    shallow: false,
    startTransition,
  });

  const { options, rules } = getFilters(segment, category);

  const visibleRule = useVisibleRules(rules, {
    topic,
    view,
  });

  useAutoResetFilters(
    rules,
    { topic, view },
    { topic: updateTopic, view: updateView }
  );

  const topicRowChunks = createRowOptions(options.topic, isMobileDevice ? 4 : 2);
  const viewRowChunks = createRowOptions(options.view, isMobileDevice ? 4 : 2);

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

        {visibleRule.view && (
          <FiltersToggleGroup
            selectedValue={view}
            rowChunks={viewRowChunks}
            onSelect={updateView}
            offsetRow={topicRowChunks.length}
          />
        )}
      </FiltersGroupsLayout>
    </div>
  );
}
