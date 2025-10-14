import { NAV_SEGMENTS } from "@/shared/model/routes";
import type { SegmentSchema } from "../types";
import { TOPIC_PARAMS, VIEW_PARAMS } from "../model/search-params";

export const INSTINCTS_CONFIG: SegmentSchema<typeof NAV_SEGMENTS.INSTINCTS> = {
  music: {
    rules: [{ key: "topic" }, { key: "view", dependsOn: ["topic"] }],
    options: {
      topic: [
        { label: "эстетика", value: TOPIC_PARAMS.eas },
        { label: "самовыражение", value: TOPIC_PARAMS.selfx },
      ],
      view: [
        { label: "по работе", value: VIEW_PARAMS.works },
        { label: "по автору", value: VIEW_PARAMS.creators },
      ],
    },
  },
  movies: {
    rules: [{ key: "topic" }, { key: "view", dependsOn: ["topic"] }],
    options: {
      topic: [
        { label: "эстетика", value: TOPIC_PARAMS.eas },
        { label: "самовыражение", value: TOPIC_PARAMS.selfx },
        { label: "концерты", value: TOPIC_PARAMS.live },
      ],
      view: [
        { label: "по работе", value: VIEW_PARAMS.works },
        { label: "по автору", value: VIEW_PARAMS.creators },
      ],
    },
  },
  books: {
    rules: [{ key: "view" }],
    options: {
      topic: [],
      view: [
        { label: "по работе", value: VIEW_PARAMS.works },
        { label: "по автору", value: VIEW_PARAMS.creators },
      ],
    },
  },
  art: {
    rules: [{ key: "view" }],
    options: {
      topic: [],
      view: [
        { label: "по работе", value: VIEW_PARAMS.works },
        { label: "по автору", value: VIEW_PARAMS.creators },
      ],
    },
  },
};
