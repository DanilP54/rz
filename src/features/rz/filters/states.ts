import { useQueryState } from "nuqs"
import { searchParams } from "./model/search-params"

export const useTopicParams = () => useQueryState('topic', searchParams.topic.withOptions({
    shallow: false
}))
export const useViewParams = () => useQueryState('view', searchParams.view.withOptions({
    shallow: false
}))

