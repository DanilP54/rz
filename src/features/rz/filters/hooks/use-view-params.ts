import { Options, useQueryState } from "nuqs";
import { searchParams, VIEW_KEY } from "../model/search-params";

export const useViewParams = (options?: Options) => useQueryState(VIEW_KEY,
    searchParams.view.withOptions({
        ...options
    }));
