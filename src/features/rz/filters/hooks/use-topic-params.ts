import { Options, useQueryState } from "nuqs";
import { searchParams } from "../model/search-params";

export const useTopicParams = (options?: Options) => useQueryState('topic', searchParams.topic.withOptions({
    ...options
 }))
 