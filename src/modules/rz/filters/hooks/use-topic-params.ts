import { Options, useQueryState } from "nuqs";
import { searchParams, TOPIC_KEY } from "../model/search-params";

export const useTopicParams = (options?: Options) => useQueryState(TOPIC_KEY,
    searchParams.topic.withOptions({
        ...options
    }))
