import { Mode, Topic } from "@/client";
import { action, atom, withInit } from "@reatom/core";
import z from "zod";

export let serverTopicSearchParam: Topic | undefined
export let serverModeSearchParam: Mode | undefined

export const initializePageSearchParams = (searchParams: CatalogSearchParams) => {
  serverTopicSearchParam = searchParams.topic;
  serverModeSearchParam = searchParams.mode
};

export const CatalogSearchParamsSchema = z.object({
  topic: z.nativeEnum(Topic).optional(),
  mode: z.nativeEnum(Mode).optional(),
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
    topic: serverTopicSearchParam || state.topic,
    mode: serverModeSearchParam|| state.mode,
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




