import type { Category, Segment } from "@/client";
import { compile } from "path-to-regexp";

export type RzParams = {
    segment: Segment;
    category: Category;
    slug?: string;  
};

const PATTERNS = {
    HOME: '/',
    FEED: '/feed',
    RADIO: '/radio',
    RZ_ROOT: '/rz',
    RZ_CATALOG: '/rz/:segment/:category',
    RZ_DETAIL:  '/rz/:segment/:category/:slug',
    RZ_PERSON:  '/rz/:segment/:category/person/:slug',
};

const toCatalog = compile<RzParams>(PATTERNS.RZ_CATALOG);
const toDetail  = compile<RzParams>(PATTERNS.RZ_DETAIL);
const toPerson  = compile<RzParams>(PATTERNS.RZ_PERSON);

function createSimpleRoute(path: string) {
    return () => path;
}

export const routes = {
    home:  createSimpleRoute(PATTERNS.HOME),
    feed:  createSimpleRoute(PATTERNS.FEED),
    radio: createSimpleRoute(PATTERNS.RADIO),
    rz: (params?: RzParams & {isPerson?: boolean}) => {
  
        if (!params) {
            return PATTERNS.RZ_ROOT;
        }

        const { slug, isPerson, category, segment } = params;

        if (isPerson && slug) {
            return toPerson({category, segment, slug});
        }

        if (slug) {
            return toDetail({category, segment, slug});
        }

        return toCatalog({category, segment, slug});
    }
};