import { mode, type Category, type Segment, topic } from "@/common/api/gen";
import { OptionsByCategory, OptionsBySegment } from "./type";

const getModeOptions = () => {
  return [
    { label: "по работе", value: mode.creators },
    { label: "по автору", value: mode.works },
  ];
};

const getInstinctsCategoryOptions = (): OptionsByCategory => {
  return {
    movies: {
      topic: [
        { label: "эстетика", value: topic.aesthetics },
        { label: "самовыражение", value: topic["self-expression"] },
        { label: "концерты", value: topic.live },
      ],
      mode: getModeOptions(),
    },
    music: {
      topic: [
        { label: "эстетика", value: topic.aesthetics },
        { label: "самовыражение", value: topic["self-expression"] },
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
        { label: "эстетика", value: topic.aesthetics },
        { label: "самовыражение", value: topic["self-expression"] },
        { label: "концерты", value: topic.live },
        { label: "документальные", value: topic.documentary },
      ],
      mode: getModeOptions(),
    },
    music: {
      topic: [
        { label: "эстетика", value: topic.aesthetics },
        { label: "самовыражение", value: topic["self-expression"] },
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
        { label: "эстетика", value: topic.aesthetics },
        { label: "самовыражение", value: topic["self-expression"] },
        { label: "сериалы", value: topic.series },
      ],
      mode: getModeOptions(),
    },
    music: {
      topic: [
        { label: "эстетика", value: topic.aesthetics },
        { label: "самовыражение", value: topic["self-expression"] },
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
