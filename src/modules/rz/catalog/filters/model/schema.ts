import { Mode, Topic } from "@/common/api/client";
import z from "zod";

export const CatalogFiltersSchema = z.object({
    topic: z.enum([Topic.AESTHETICS, Topic.SELF_EXPRESSION, Topic.LIVE, Topic.DOCUMENTARY, Topic.SERIES]).optional(),
    mode: z.enum([Mode.CREATORS, Mode.WORKS]).optional()
});

export type CatalogFilters = z.infer<typeof CatalogFiltersSchema>;