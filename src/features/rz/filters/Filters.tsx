import {
    InstinctsMusicFiltersBar,
    InstinctsMovieFiltersBar,
    InstinctsArtFiltersBar,
    InstinctsBooksFiltersBar,
} from "../instincts";
import { IntellectMusicFiltersBar } from "../intellect";
import { ContentCategory, RZ_SEGMENTS } from "@/shared/model/routes";
import { JSX } from "react";

const filters = {
    [RZ_SEGMENTS.INSTINCTS]: {
        music: <InstinctsMusicFiltersBar />,
        movies: <InstinctsMovieFiltersBar />,
        art: <InstinctsArtFiltersBar />,
        books: <InstinctsBooksFiltersBar />,
    },
    [RZ_SEGMENTS.INTELLECT]: {
        music: <IntellectMusicFiltersBar />,
        movies: <h1>movie</h1>,
        art: <h1>art</h1>,
        books: <h1>books</h1>,
    },
    [RZ_SEGMENTS.BALANCE]: {
        music: <h1>music</h1>,
        movies: <h1>movie</h1>,
        art: <h1>art</h1>,
        books: <h1>books</h1>,
    }
} satisfies { [Key in RZ_SEGMENTS]: Record<ContentCategory, JSX.Element> }

export function Filters({ segment, category }: {
    segment: RZ_SEGMENTS;
    category: ContentCategory;
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
