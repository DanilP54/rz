"use client";

import React from "react";
import { NavSegments, SegmentCategory } from "@/shared/model/routes";

import { FiltersToggleGroup } from "./ui/FiltersToggleGroup";
import { FiltersGroupsLayout } from "./ui/FiltersToggleGroupLayout";
import { createRowChunks } from "./helpers/create-rows-group";

import { useTopicParams } from "./hooks/use-topic-params";
import { useViewParams } from "./hooks/use-view-params";
import { useVisibleRules } from "./hooks/use-visible-rules";
import { useAutoResetFilters } from "./hooks/use-auto-reset-filters";
import { getFilters } from "./schema/schema";
import { useContextCus } from "@/app/rz/(page-contents)/[segment]/[category]/prov";

interface IFiltersBar {
  segment: NavSegments;
  category: SegmentCategory<NavSegments>;
}

export function FiltersBar({ segment, category }: IFiltersBar) {
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
    topic, view
  });

  useAutoResetFilters(
    rules,
    { topic, view },
    {
      view: updateView,
    }
  );

  const topicRowChunks = createRowChunks(options.topic);
  const viewRowChunks = createRowChunks(options.view);

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
