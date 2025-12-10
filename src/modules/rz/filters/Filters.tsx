import {
  InstinctsMusicFiltersBar,
  InstinctsMovieFiltersBar,
  InstinctsArtFiltersBar,
  InstinctsBooksFiltersBar,
} from "../instincts-segment";
import { IntellectMusicFiltersBar } from "../intellect-segment";
import {
  NAV_SEGMENTS,
  NavSegments,
  SegmentCategory,
} from "@/common/model/routes";
import { JSX } from "react";

type Filters = {
  [Segment in NavSegments]: Record<SegmentCategory<Segment>, JSX.Element>;
}

const filters = {
  [NAV_SEGMENTS.INSTINCTS]: {
    music: <InstinctsMusicFiltersBar />,
    movies: <InstinctsMovieFiltersBar />,
    art: <InstinctsArtFiltersBar />,
    books: <InstinctsBooksFiltersBar />,
  },
  [NAV_SEGMENTS.INTELLECT]: {
    music: <IntellectMusicFiltersBar />,
    movies: <h1>movie</h1>,
    art: <h1>art</h1>,
    books: <h1>books</h1>,
  },
  [NAV_SEGMENTS.BALANCE]: {
    music: <h1>music</h1>,
    movies: <h1>movie</h1>,
    art: <h1>art</h1>,
    books: <h1>books</h1>,
  },
} satisfies Filters;

export function Filters({
  segment,
  category,
}: {
  segment: NavSegments;
  category: SegmentCategory<NavSegments>;
}) {
  return (
    <div
      data-segment={segment}
      className={`group/filters w-3/4 absolute top-[164px] sm:top-[106px]  right-0 flex`}
    >
      {filters[segment][category]}
    </div>
  );
}
