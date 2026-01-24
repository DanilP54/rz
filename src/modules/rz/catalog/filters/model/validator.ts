import { type CatalogFilters, CatalogFiltersSchema } from "./schema";



export const decodeField =
  <
    Key extends keyof CatalogFilters
  >(
    key: Key,
    value: string | string[] | undefined,
  ) => {
    const res = CatalogFiltersSchema.safeParse({ [key]: value });
    return res.success ? res.data[key] : undefined;
  };


  export const validateSearchParams = (value: Record<string, string | undefined>): CatalogFilters => {
    return {
        topic: decodeField('topic', value.topic),
        mode: decodeField('mode', value.mode),
    }
  }