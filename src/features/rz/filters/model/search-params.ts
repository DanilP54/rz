import { parseAsString, useQueryState } from "nuqs";

export enum PARAMS {
    AESTHETICS = 'eas',
    SELFEXPRESSION = 'selfx',
    CONCERTS = 'live',
    DOCUMENTARY = 'doc',
    BY_WORKS = 'by_works',
    BY_CREATORS = 'by_creators',
}

export const CATEGORY_PARAMS = {
    AESTHETICS: 'eas',
    SELFEXPRESSION: 'selfx',
    CONCERTS: 'live',
    DOCUMENTARY: 'doc',
}

export const TYPE_PARAMS = {
    BY_WORKS: 'by_works',
    BY_CREATORS: 'by_creators'
}

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
