"use client";

import { type ReactNode, useMemo, useEffect, useState, useLayoutEffect } from "react";
import type { Segment, Category, Topic, Mode } from "@/common/api/gen";
import { initializeParams } from "@/modules/rz/params.store";
import { useStore } from "@nanostores/react";
import {
  $catalogFilters,
  CatalogSearchParams,
} from "./catalog/filters/model/search-params.model";

interface Props {
  segment: Segment;
  category: Category;
  initialValues: CatalogSearchParams;
  children: ReactNode;
}

export function CatalogHydrationBoundary({
  segment,
  category,
  initialValues,
  children,
}: Props) {

  // const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    $catalogFilters.updateAll({
      topic: initialValues.topic,
      mode: initialValues.mode,
    });
    // setMounted(true);
  }, []);

  // useMemo(() => {
  //   if (mounted)
  //     return $catalogFilters.updateAll({
  //       topic: initialValues.topic,
  //       mode: initialValues.mode,
  //     });
  // }, [mounted, storeValues, initialValues]);

  useMemo(() => {
    initializeParams(segment, category);
  }, [segment, category]);

  return <>{children}</>;
}
