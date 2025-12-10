import {
  createLoader,
  inferParserType,
  parseAsStringLiteral,
  parseAsInteger
} from "nuqs/server";

export const TOPIC_KEY = "topic";
export const MODE_KEY = "mode";

export type TopicKey = typeof TOPIC_KEY;
export type ModeKey = typeof MODE_KEY;

export const TOPIC_PARAMS = {
  eas: "aesthetics",
  selfx: "self-expression",
  live: "live",
  doc: "documentary",
  srl: "series",
} as const;

export const MODE_PARAMS = {
  works: "works",
  creators: "creators",
} as const;

export type TopicParams = (typeof TOPIC_PARAMS)[keyof typeof TOPIC_PARAMS];
export type ViewParams = (typeof MODE_PARAMS)[keyof typeof MODE_PARAMS];

export type AllParams = TopicParams | ViewParams;

export const searchParams = {
  [TOPIC_KEY]: parseAsStringLiteral([...Object.values(TOPIC_PARAMS)]),
  [MODE_KEY]: parseAsStringLiteral([...Object.values(MODE_PARAMS)]),
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(30)
};

export type SearchParams = inferParserType<typeof searchParams>;
export type SearchParamsKeys = keyof SearchParams;

export const loadSearchParams = createLoader(searchParams);
