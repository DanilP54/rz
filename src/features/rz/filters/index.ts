import type { SearchParams } from './model/search-params';

export { PARAMS, useCategoryParams, useTypeParams } from './model/search-params';

export interface Options {
    label: string
    value: string
}

export type FilterOptions = {
    [K in SearchParams]?: Options[]
}