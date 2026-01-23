import z from "zod";
import { CatalogFilters, CatalogFiltersSchema } from "./schema";



export const decodeField =
  <
    Schema extends z.ZodObject<any>,
    Key extends keyof z.infer<Schema>
  >(
    schema: Schema,
    key: Key
  ) =>
  (value: string | string[] | undefined): z.infer<Schema>[Key] | undefined => {
    const res = schema.safeParse({ [key]: value });
    return res.success ? res.data[key] : undefined;
  };


  export const validateSearchParams = (value: Record<string, string | undefined>): CatalogFilters => {
    return {
        topic: decodeField(CatalogFiltersSchema, 'topic')(value.topic),
        mode: decodeField(CatalogFiltersSchema, 'mode')(value.mode),
    }
  }