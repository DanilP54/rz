import { NAV_SEGMENTS } from "@/shared/model/routes";

import type {
  FilterOptionsByParams,
  FilterRuleKey,
  FiltersRules,
  SegmentSchema,
  TestSchema,
  TestSchemaTest,
} from "../types";
import {
  AllParams,
  SearchParams,
  TOPIC_PARAMS,
  VIEW_PARAMS,
} from "../model/search-params";

export interface FilterRuleBaseS {
  readonly dependsOn?: ReadonlyArray<FilterRuleKey>;
  exclude?: ReadonlyArray<AllParams>;
}

const VISIBLE_RULES: TestSchemaTest<
  typeof NAV_SEGMENTS.BALANCE,
  FilterRuleBaseS
> = {
  music: { view: { dependsOn: ["topic"], exclude: ["doc"] } },
  movies: { view: { dependsOn: ["topic"] } },
  books: { view: { dependsOn: ["topic"] } },
  art: { view: { dependsOn: ["topic"] } },
  // music: [{ key: "topic" }, { key: "view", dependsOn: ["topic"]}],
  // movies: [{ key: "topic" }, { key: "view", dependsOn: ["topic"] }],
  // books: [{ key: "view" }],
  // art: [{ key: "view" }],
};

const OPTIONS: TestSchema<typeof NAV_SEGMENTS.BALANCE, FilterOptionsByParams> =
  {
    music: {
      topic: [
        { label: "эстетика", value: TOPIC_PARAMS.eas },
        { label: "самовыражение", value: TOPIC_PARAMS.selfx },
      ],
      view: [
        { label: "по работе", value: VIEW_PARAMS.works },
        { label: "по автору", value: VIEW_PARAMS.creators },
      ],
    },
    movies: {
      topic: [
        { label: "эстетика", value: TOPIC_PARAMS.eas },
        { label: "самовыражение", value: TOPIC_PARAMS.selfx },
        { label: "сериалы", value: TOPIC_PARAMS.srl },
      ],
      view: [
        { label: "по работе", value: VIEW_PARAMS.works },
        { label: "по автору", value: VIEW_PARAMS.creators },
      ],
    },
    books: {
      topic: [],
      view: [
        { label: "по работе", value: VIEW_PARAMS.works },
        { label: "по автору", value: VIEW_PARAMS.creators },
      ],
    },
    art: {
      topic: [],
      view: [
        { label: "по работе", value: VIEW_PARAMS.works },
        { label: "по автору", value: VIEW_PARAMS.creators },
      ],
    },
  };

export const BALANCE_CONFIG: SegmentSchema<typeof NAV_SEGMENTS.BALANCE> = {
  music: {
    rules: VISIBLE_RULES.music,
    options: OPTIONS.music,
  },
  movies: {
    rules: VISIBLE_RULES.movies,
    options: OPTIONS.movies,
  },
  books: {
    rules: VISIBLE_RULES.books,
    options: OPTIONS.books,
  },
  art: {
    rules: VISIBLE_RULES.art,
    options: OPTIONS.art,
  },
};
