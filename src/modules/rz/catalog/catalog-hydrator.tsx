"use client";

import { useMemo } from "react";
import { initializePageSearchParams } from "./filters";
import { initializePageParams } from "./page-params.store";
import { CatalogPageProps } from "./type";

type CatalogPageHydratorProps = {
  [K in keyof CatalogPageProps]: Awaited<CatalogPageProps[K]>;
};

export function CatalogPageHydrator({
  children,
  ...props
}: {
  children: React.ReactNode;
} & CatalogPageHydratorProps) {
  const { params, searchParams } = props;

  useMemo(() => {
    initializePageParams(params);
  }, [params]);

  useMemo(() => {
    initializePageSearchParams(searchParams);
  }, [searchParams]);

  return <>{children}</>;
}
