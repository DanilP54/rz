
import { Category, Segment } from "@/common/api/client";
import { CatalogFilters } from "./filters/model/schema";
import z from "zod";

export const CatalogParamsSchema = z.object({
  category: z.enum([Category.MOVIES, Category.MUSIC, Category.BOOKS, Category.ART]),
  segment: z.enum([Segment.INSTINCTS, Segment.INTELLECT, Segment.BALANCE]),
})

export type CatalogParams = z.infer<typeof CatalogParamsSchema>;

export interface CatalogPageProps {
  params: Promise<CatalogParams>;
  searchParams: Promise<Record<string, string | undefined>>;
}

