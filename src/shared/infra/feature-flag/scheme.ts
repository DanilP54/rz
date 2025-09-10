import { z } from "zod";

export const featureScheme = z.object({
    FEATURE_TEMPLATES: z.string(),
    FEATURE_MESSAGES: z.string(),
    FEATURE_FORWARDING: z.string()
});

export type FeatureSchemeType = z.infer<typeof featureScheme>;

