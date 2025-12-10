import { NAV_SEGMENTS } from "@/common/model/routes";

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
  MODE_PARAMS,
} from "../model/search-params";

export interface FilterRuleBaseS {
  readonly dependsOn?: ReadonlyArray<FilterRuleKey>;
  exclude?: ReadonlyArray<AllParams>;
}

const VISIBLE_RULES: TestSchemaTest<
  typeof NAV_SEGMENTS.BALANCE,
  FilterRuleBaseS
> = {
  music: { mode: { dependsOn: ["topic"], exclude: ["doc"] } },
  movies: { mode: { dependsOn: ["topic"] } },
  books: { mode: { dependsOn: ["topic"] } },
  art: { mode: { dependsOn: ["topic"] } },
  // music: [{ key: "topic" }, { key: "mode", dependsOn: ["topic"]}],
  // movies: [{ key: "topic" }, { key: "mode", dependsOn: ["topic"] }],
  // books: [{ key: "mode" }],
  // art: [{ key: "mode" }],
};

const OPTIONS: TestSchema<typeof NAV_SEGMENTS.BALANCE, FilterOptionsByParams> =
  {
    music: {
      topic: [
        { label: "эстетика", value: TOPIC_PARAMS.eas },
        { label: "самовыражение", value: TOPIC_PARAMS.selfx },
      ],
      mode: [
        { label: "по работе", value: MODE_PARAMS.works },
        { label: "по автору", value: MODE_PARAMS.creators },
      ],
    },
    movies: {
      topic: [
        { label: "эстетика", value: TOPIC_PARAMS.eas },
        { label: "самовыражение", value: TOPIC_PARAMS.selfx },
        { label: "сериалы", value: TOPIC_PARAMS.srl },
      ],
      mode: [
        { label: "по работе", value: MODE_PARAMS.works },
        { label: "по автору", value: MODE_PARAMS.creators },
      ],
    },
    books: {
      topic: [],
      mode: [
        { label: "по работе", value: MODE_PARAMS.works },
        { label: "по автору", value: MODE_PARAMS.creators },
      ],
    },
    art: {
      topic: [],
      mode: [
        { label: "по работе", value: MODE_PARAMS.works },
        { label: "по автору", value: MODE_PARAMS.creators },
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
