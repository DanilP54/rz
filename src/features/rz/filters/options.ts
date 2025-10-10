import { NAV_SEGMENTS, NavSegments, SegmentCategory } from "@/shared/model/routes";
import { TOPIC_PARAMS, VIEW_PARAMS } from "./constants";
import { FilterGroup } from "./types";

export const FILTER_OPTIONS = {
    [NAV_SEGMENTS.INSTINCTS]: {
        music: {
            topic: [
                {
                    label: 'эстетика',
                    value: TOPIC_PARAMS.eas
                },
                {
                    label: 'самовыражение',
                    value: TOPIC_PARAMS.selfx
                }],
            view: [
                {
                    label: 'по работе',
                    value: VIEW_PARAMS.works
                },
                {
                    label: 'по автору',
                    value: VIEW_PARAMS.creators
                }]
        },
        movies: {
            topic: [
                {
                    label: 'эстетика',
                    value: TOPIC_PARAMS.eas
                },
                {
                    label: 'самовыражение',
                    value: TOPIC_PARAMS.selfx
                },
                {
                    label: 'концерты',
                    value: TOPIC_PARAMS.live
                }],
            view: [
                {
                    label: 'по работе',
                    value: VIEW_PARAMS.works
                },
                {
                    label: 'по автору',
                    value: VIEW_PARAMS.creators
                }],
        },
        books: {
            topic: [],
            view: [
                {
                    label: 'по работе',
                    value: VIEW_PARAMS.works
                },
                {
                    label: 'по автору',
                    value: VIEW_PARAMS.creators
                }],
        },
        art: {
            topic: [],
            view: [
                {
                    label: 'по работе',
                    value: VIEW_PARAMS.works
                },
                {
                    label: 'по автору',
                    value: VIEW_PARAMS.creators
                }],
        }
    },
    [NAV_SEGMENTS.INTELLECT]: {
        music: {
            topic: [
                {
                    label: 'эстетика',
                    value: TOPIC_PARAMS.eas
                },
                {
                    label: 'самовыражение',
                    value: TOPIC_PARAMS.selfx
                }],
            view: [
                {
                    label: 'по работе',
                    value: VIEW_PARAMS.works
                },
                {
                    label: 'по автору',
                    value: VIEW_PARAMS.creators
                }]
        },
        movies: {
            topic: [
                {
                    label: 'эстетика',
                    value:  TOPIC_PARAMS.eas
                },
                {
                    label: 'самовыражение',
                    value: TOPIC_PARAMS.selfx
                },
                {
                    label: 'концерты',
                    value: TOPIC_PARAMS.live
                },
                {
                    label: 'документальные',
                    value: TOPIC_PARAMS.doc
                }],
            view: [
                {
                    label: 'по работе',
                    value: VIEW_PARAMS.works
                },
                {
                    label: 'по автору',
                    value: VIEW_PARAMS.creators
                }]
        },
        books: {
            topic: [],
            view: [
                {
                    label: 'по работе',
                    value: VIEW_PARAMS.works
                },
                {
                    label: 'по автору',
                    value: VIEW_PARAMS.creators
                }]
        },
        art: {
            topic: [],
            view: [
                {
                    label: 'по работе',
                    value: VIEW_PARAMS.works
                },
                {
                    label: 'по автору',
                    value: VIEW_PARAMS.creators
                }]
        }
    },
    [NAV_SEGMENTS.BALANCE]: {
        music: {
            topic: [
                {
                    label: 'эстетика',
                    value: TOPIC_PARAMS.eas
                },
                {
                    label: 'самовыражение',
                    value: TOPIC_PARAMS.selfx
                }],
            view: [
                {
                    label: 'по работе',
                    value: VIEW_PARAMS.works
                },
                {
                    label: 'по автору',
                    value: VIEW_PARAMS.creators
                }]
        },
        movies: {
            topic: [
                {
                    label: 'эстетика',
                    value: TOPIC_PARAMS.eas
                },
                {
                    label: 'самовыражение',
                    value: TOPIC_PARAMS.selfx
                },
                {
                    label: 'сериалы',
                    value: TOPIC_PARAMS.srl
                }],
            view: [
                {
                    label: 'по работе',
                    value: VIEW_PARAMS.works
                },
                {
                    label: 'по автору',
                    value: VIEW_PARAMS.creators
                }]
        },
        books: {
            topic: [],
            view: [
                {
                    label: 'по работе',
                    value: VIEW_PARAMS.works
                },
                {
                    label: 'по автору',
                    value: VIEW_PARAMS.creators
                }]
        },
        art: {
            topic: [],
            view: [
                {
                    label: 'по работе',
                    value: VIEW_PARAMS.works
                },
                {
                    label: 'по автору',
                    value: VIEW_PARAMS.creators
                }]
        }
    }
} as const satisfies FilterOptions


type FilterOptions = {
    [S in NavSegments]: {
        [C in SegmentCategory<S>]: FilterGroup
    }
}
