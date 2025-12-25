"use client";

import { useMemo } from "react";
import {
  CatalogSearchParams,
  initializeCatalogState,
} from "./filters/model/search-params.model";
import { initializeParamsState } from "./path-params";
import { CatalogResponse, Category, Segment } from "@/common/api/gen";
import { initializeCatalog } from "./pagination.model";

export function CatalogHydrator({
  searchParams,
  params,
  children,
  data,
}: {
  searchParams: CatalogSearchParams;
  params: { category: Category; segment: Segment };
  data: CatalogResponse;
  children: React.ReactNode;
}) {
  useMemo(() => {
    initializeCatalogState(searchParams);
  }, [searchParams]);

  useMemo(() => {
    initializeParamsState(params.category, params.segment);
  }, [params.category, params.segment]);

  useMemo(() => {
    initializeCatalog(data);
  }, [data]);
  return <>{children}</>;
}
