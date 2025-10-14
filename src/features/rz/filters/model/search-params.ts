import { createLoader, inferParserType, parseAsStringLiteral } from 'nuqs/server'

export const TOPIC_KEY = 'topic'
export const VIEW_KEY = 'view'

export type TopicKey = typeof TOPIC_KEY
export type ViewKey = typeof VIEW_KEY

export const TOPIC_PARAMS = {
    eas: 'eas',
    selfx: 'selfx',
    live: 'live',
    doc: 'doc',
    srl: 'srl',
} as const

export const VIEW_PARAMS = {
    all: 'all',
    works: 'works',
    creators: 'creators',
} as const

export type TopicParams = (typeof TOPIC_PARAMS)[keyof typeof TOPIC_PARAMS]
export type ViewParams = (typeof VIEW_PARAMS)[keyof typeof VIEW_PARAMS]

export type AllParams = TopicParams | ViewParams

export const searchParams = {
    [TOPIC_KEY]: parseAsStringLiteral([...Object.values(TOPIC_PARAMS)]),
    [VIEW_KEY]: parseAsStringLiteral([...Object.values(VIEW_PARAMS)]).withDefault('all'),
}

export type SearchParams = inferParserType<typeof searchParams>
export type SearchParamsKeys = keyof SearchParams

export const loadSearchParams = createLoader(searchParams);





