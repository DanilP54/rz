import { Category, Mode, Segment, Topic } from "@/client";
import { OptionsByCategory, OptionsBySegment } from "./type";

const getModeOptions = () => {
  return [
    { label: "по работе", value: Mode.CREATORS },
    { label: "по автору", value: Mode.WORKS },
  ];
};

const getInstinctsCategoryOptions = (): OptionsByCategory => {
  return {
    movies: {
      topic: [
        { label: "эстетика", value: Topic.AESTHETICS },
        { label: "самовыражение", value: Topic.SELF_EXPRESSION },
        { label: "концерты", value: Topic.LIVE },
      ],
      mode: getModeOptions(),
    },
    music: {
      topic: [
        { label: "эстетика", value: Topic.AESTHETICS },
        { label: "самовыражение", value: Topic.SELF_EXPRESSION },
      ],
      mode: getModeOptions(),
    },
    books: {
      topic: [],
      mode: getModeOptions(),
    },
    art: {
      topic: [],
      mode: getModeOptions(),
    },
  };
};

const getIntellectCategoryOptions = (): OptionsByCategory => {
  return {
    movies: {
      topic: [
        { label: "эстетика", value: Topic.AESTHETICS  },
        { label: "самовыражение", value: Topic.SELF_EXPRESSION },
        { label: "концерты", value: Topic.LIVE },
        { label: "документальные", value: Topic.DOCUMENTARY },
      ],
      mode: getModeOptions(),
    },
    music: {
      topic: [
        { label: "эстетика", value: Topic.AESTHETICS },
        { label: "самовыражение", value: Topic.SELF_EXPRESSION },
      ],
      mode: getModeOptions(),
    },
    books: {
      topic: [],
      mode: getModeOptions(),
    },
    art: {
      topic: [],
      mode: getModeOptions(),
    },
  };
};

const getBalanceCategoryOptions = (): OptionsByCategory => {
  return {
    movies: {
      topic: [
        { label: "эстетика", value: Topic.AESTHETICS },
        { label: "самовыражение", value: Topic.SELF_EXPRESSION },
        { label: "сериалы", value: Topic.SERIES },
      ],
      mode: getModeOptions(),
    },
    music: {
      topic: [
        { label: "эстетика", value: Topic.AESTHETICS },
        { label: "самовыражение", value: Topic.SELF_EXPRESSION },
      ],
      mode: getModeOptions(),
    },
    books: {
      topic: [],
      mode: getModeOptions(),
    },
    art: {
      topic: [],
      mode: getModeOptions(),
    },
  };
};

export function getCatalogFiltersOptions(segment: Segment, category: Category) {
  const options = {
    instincts: { ...getInstinctsCategoryOptions() },
    intellect: { ...getIntellectCategoryOptions() },
    balance: { ...getBalanceCategoryOptions() },
  } as const satisfies OptionsBySegment;

  return options[segment][category];
}
