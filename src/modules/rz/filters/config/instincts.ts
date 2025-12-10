import { NAV_SEGMENTS } from "@/common/model/routes";
import type { SegmentSchema } from "../types";
import { TOPIC_PARAMS, MODE_PARAMS } from "../model/search-params";

export const INSTINCTS_CONFIG: SegmentSchema<typeof NAV_SEGMENTS.INSTINCTS> = {
  music: {
    rules: [{ key: "topic" }, { key: "mode", dependsOn: ["topic"] }],
    options: {
      topic: [
        { label: "эстетика", value: TOPIC_PARAMS.eas },
        { label: "самовыражение", value: TOPIC_PARAMS.selfx },
      ],
      mode: [
        { label: "по работе", value: MODE_PARAMS.works },
        { label: "по автору", value: MODE_PARAMS.creators },
      ],
    },
  },
  movies: {
    rules: [{ key: "topic" }, { key: "mode", dependsOn: ["topic"] }],
    options: {
      topic: [
        { label: "эстетика", value: TOPIC_PARAMS.eas },
        { label: "самовыражение", value: TOPIC_PARAMS.selfx },
        { label: "концерты", value: TOPIC_PARAMS.live },
      ],
      mode: [
        { label: "по работе", value: MODE_PARAMS.works },
        { label: "по автору", value: MODE_PARAMS.creators },
      ],
    },
  },
  books: {
    rules: [{ key: "mode" }],
    options: {
      topic: [],
      mode: [
        { label: "по работе", value: MODE_PARAMS.works },
        { label: "по автору", value: MODE_PARAMS.creators },
      ],
    },
  },
  art: {
    rules: [{ key: "mode" }],
    options: {
      topic: [],
      mode: [
        { label: "по работе", value: MODE_PARAMS.works },
        { label: "по автору", value: MODE_PARAMS.creators },
      ],
    },
  },
};
