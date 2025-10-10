import { inferParserType } from "nuqs";
import { TOPIC_PARAMS, VIEW_PARAMS } from "./constants";
import { searchParams } from "./model/search-params";

export type TopicParams = typeof TOPIC_PARAMS[keyof typeof TOPIC_PARAMS]
export type ViewParams = typeof VIEW_PARAMS[keyof typeof VIEW_PARAMS]

export type AllParams = TopicParams | ViewParams

export type FilterOption<Params> = {
    label: string;
    value: Params
}

type SearchParams = inferParserType<typeof searchParams>

export type FilterGroup = {
    [P in keyof SearchParams]: FilterOption<SearchParams[P]>[]
}
