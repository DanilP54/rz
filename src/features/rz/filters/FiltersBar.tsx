'use client'

import React from "react";
import { NavSegments, SegmentCategory } from '@/shared/model/routes';

import { FILTERS_CONFIG } from "./config";
import { useVisibleRules } from "./useVisibleFilters";
import { FiltersToggleGroup } from "./FiltersToggleGroup";
import { FiltersGroupsLayout } from "./FiltersToggleGroupLayout";
import { createRowsFilterGroup } from "./create-row-groups";
import { useTopicParams, useViewParams } from "./states";
import { FilterGroup } from "./types";

interface IFiltersBar {
  segment: NavSegments;
  category: SegmentCategory<NavSegments>;
  filters: FilterGroup;
}

export function FiltersBar({
    segment,
    category,
  filters,
}: IFiltersBar) {

  const [topic, updateTopic] = useTopicParams()
  const [view, updateView] = useViewParams()

  const config = FILTERS_CONFIG[segment][category]

  const visibleRule = useVisibleRules(config, {topic: topic ?? undefined, view: view ?? undefined})

    return (
        <div
            data-segment={segment}
            className={`group/filters w-3/4 absolute top-[164px] sm:top-[106px]  right-0 flex`}
        >
      <FiltersGroupsLayout>
        {visibleRule.topic && <FiltersToggleGroup 
          filterGroups={createRowsFilterGroup(filters.topic)} 
          onSelect={updateTopic} 
          selectedValue={topic} 
        />}
        
        {visibleRule.view && <FiltersToggleGroup 
          filterGroups={createRowsFilterGroup(filters.view)} 
          onSelect={updateView} 
          selectedValue={view} 
          offsetRow={visibleRule.topic ? filters.topic.length : 0} 
        />}
      </FiltersGroupsLayout>
        </div>
    );
}




function TopicFilters() {
  return (
    <FiltersToggleGroup 
      filterGroups={createRowsFilterGroup(filters.topic)} 
      onSelect={updateTopic} 
      selectedValue={topic} 
    />
  )
}


function ViewFilters() {
  return (
    <FiltersToggleGroup 
      filterGroups={createRowsFilterGroup(filters.view)} 
      onSelect={updateView} 
      selectedValue={view} 
      offsetRow={visibleRule.topic ? filters.topic.length : 0} 
    />
  )
}
