import { featureScheme, FeatureSchemeType } from "./scheme";

export const featureEnv = featureScheme.parse({
    FEATURE_TEMPLATES: process.env.FEATURE_TEMPLATES,
    FEATURE_MESSAGES: process.env.FEATURE_MESSAGES,
    FEATURE_FORWARDING: process.env.FEATURE_FORWARDING
});

export async function getFeature(feature: keyof FeatureSchemeType): Promise<boolean> {
    return featureEnv[feature] === '1'
};