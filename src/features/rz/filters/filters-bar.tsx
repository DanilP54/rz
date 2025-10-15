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
import { useTransitionContext } from "@/app/rz/(page-contents)/[segment]/[category]/TransitionProvider";
import { FilterOptionsByParams, FiltersRules } from "./types";

interface IFiltersBar {
  segment: NavSegments;
  category: SegmentCategory<NavSegments>;
  isMobileDevice?: boolean;
  rules: FiltersRules
  options: Readonly<FilterOptionsByParams>
}

export function FiltersBar({
  segment,
  category,
  rules,
  options,
  isMobileDevice
}: IFiltersBar) {

  const { startTransition } = useTransitionContext();

  const [topic, updateTopic] = useTopicParams({
    shallow: false,
    startTransition,
  });

  const [view, updateView] = useViewParams({
    shallow: false,
    startTransition,
  });

  const visibleRule = useVisibleRules(rules, { topic, view });

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
