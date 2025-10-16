import { parseAsString, useQueryState } from "nuqs";

export const PARAMS = {
    AESTHETICS: 'eas',
    SELFEXPRESSION: 'selfx',
    CONCERTS: 'live',
    DOCUMENTARY: 'doc',
    BY_WORKS: 'by_works',
    BY_CREATORS: 'by_creators',
} as const;

export type Params = typeof PARAMS[keyof typeof PARAMS]

export const searchParams = {
    category: parseAsString.withDefault(''),
    type: parseAsString.withDefault(''),
}

export type SearchParams = keyof typeof searchParams

export const useCategoryParams = () => {
    return useQueryState('category', searchParams.category);
}

export const useTypeParams = () => {
    return useQueryState('type', searchParams.type)
}
