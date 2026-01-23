import { createQsUtils } from "@vp-tw/nanostores-qs";
import { effect } from "nanostores";
import { CatalogFiltersSchema } from "./schema";
import { decodeField } from "./validator";

const qsUtils = createQsUtils();

export const $catalogFilters = qsUtils.createSearchParamsStore((def) => ({
    topic: def({
        decode: (value) => decodeField(CatalogFiltersSchema, 'topic')(value),
    }),
    mode: def({
        decode: (value) => decodeField(CatalogFiltersSchema, 'mode')(value),
    }),
}));


effect($catalogFilters.$values, (value) => {
    if(value.topic === undefined) {
        $catalogFilters.update('mode', undefined);
    }
})