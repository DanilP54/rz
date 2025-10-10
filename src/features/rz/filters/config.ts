import { NAV_SEGMENTS } from "@/shared/model/routes";

export const FILTERS_CONFIG = {
  [NAV_SEGMENTS.INSTINCTS]: {
    music: [
      { key: "topic" },
      { key: "view", dependsOn: ["topic"] },
    ],
    movies: [
      { key: "topic" },
      { key: "view", dependsOn: ["topic"] },
    ],
    books: [
      { key: "view" },
    ],
    art: [
      { key: "view" },
    ],
  },
  [NAV_SEGMENTS.INTELLECT]: {
    music: [
      { key: "topic" },
      { key: "view", dependsOn: ["topic"] },
    ],
    movies: [
      { key: "topic" },
      { key: "view", dependsOn: ["topic"], visibleIf: (params: Record<string, string | undefined>) => !!params.topic && params.topic !== 'doc' },
    ],
    books: [
      { key: "view" },
    ],
    art: [
      { key: "view" },
    ],
  },

  [NAV_SEGMENTS.BALANCE]: {
    music: [
      { key: "topic" },
      { key: "view", dependsOn: ["topic"] },
    ],
    movies: [
      { key: "topic" },
      { key: "view", dependsOn: ["topic"] },
    ],
    books: [
      { key: "view" },
    ],
    art: [
      { key: "view" },
    ],
  },

  
} as const;