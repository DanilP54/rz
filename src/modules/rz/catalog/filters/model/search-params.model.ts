import { topic, type Mode, type Topic, mode } from "@/common/api/gen";
import { atom, action, withInit } from "@reatom/core";
import z from "zod";

let serverParams: CatalogSearchParams = {
  topic: undefined,
  mode: undefined
};

export const initializeCatalogState = (params: CatalogSearchParams) => {
  serverParams = params;
};

export const CatalogSearchParamsSchema = z.object({
  topic: z.nativeEnum(topic).optional(),
  mode: z.nativeEnum(mode).optional(),
});

export type CatalogSearchParams = z.infer<typeof CatalogSearchParamsSchema>;

const initState: CatalogSearchParams = {
  topic: undefined,
  mode: undefined,
};


export const catalogFilters = atom<CatalogSearchParams>(
  initState,
  "catalogParams"
).extend(
  withInit((state) => ({
    topic: serverParams.topic || state.topic,
    mode: serverParams.mode || state.mode,
  })),
  (target) => ({
    update: action((patch: CatalogSearchParams) => {
      if (typeof window === "undefined") throw new Error('window is indefined');

      const url = new URL(window.location.href);
      const nextState = { ...target(), ...patch };

      if ("topic" in patch) {
        nextState.mode = undefined;
        url.searchParams.delete("mode");
      }

      Object.entries(patch).forEach(([key, value]) => {
        if (value) url.searchParams.set(key, value);
        else url.searchParams.delete(key);
      });

      window.history.replaceState(null, "", url.toString());

      target.set(nextState);
    }),
  })
);




