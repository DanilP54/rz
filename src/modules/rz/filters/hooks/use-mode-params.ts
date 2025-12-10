import { Options, useQueryState } from "nuqs";
import { searchParams, MODE_KEY } from "../model/search-params";

export const useModeParams = (options?: Options) => useQueryState(MODE_KEY,
    searchParams.mode.withOptions({
        ...options
    }));


export const usePageParams = (options?: Options) => useQueryState('page', searchParams.page.withOptions({...options}))