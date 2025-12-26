import type { Category, Segment } from "@/common/api/gen";
import { CatalogSearchParams } from "./filters";

export interface CatalogPageProps {
  params: Promise<{category: Category; segment: Segment }>;
  searchParams: Promise<CatalogSearchParams>;
}
