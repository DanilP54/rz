import {createLoader, inferParserType, parseAsStringLiteral} from 'nuqs/server'

export const TOPIC_PARAMS = {
    eas: 'eas',
    selfx: 'selfx',
    live: 'live',
    doc: 'doc',
    srl: 'srl',
} as const


export const VIEW_PARAMS = {
    works: 'works',
    creators: 'creators',
} as const


export const searchParams = {
    topic: parseAsStringLiteral([...Object.values(TOPIC_PARAMS)]),
    view: parseAsStringLiteral([...Object.values(VIEW_PARAMS)]),
}

export const loadSearchParams = createLoader(searchParams);


export type SearchParams = inferParserType<typeof searchParams>
export type SearchParamsKeys = keyof SearchParams

export type TopicKey = 'topic'
export type ViewKey = 'view'

export type TopicParams = (typeof TOPIC_PARAMS)[keyof typeof TOPIC_PARAMS]
export type ViewParams = (typeof VIEW_PARAMS)[keyof typeof VIEW_PARAMS]

export type AllParams = TopicParams | ViewParams


