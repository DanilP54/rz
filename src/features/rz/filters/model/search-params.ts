import {createLoader, parseAsStringLiteral} from 'nuqs/server'
import { TOPIC_PARAMS, VIEW_PARAMS } from '../constants'

export const searchParams = {
    topic: parseAsStringLiteral([...Object.values(TOPIC_PARAMS)]),
    view: parseAsStringLiteral([...Object.values(VIEW_PARAMS)]),
}

export const loadSearchParams = createLoader(searchParams);




