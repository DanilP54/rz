import { Options, useQueryState } from "nuqs";
import { searchParams } from "../model/search-params";

export const useViewParams = (options?: Options) => useQueryState('view', searchParams.view.withOptions({
    ...options
}))
