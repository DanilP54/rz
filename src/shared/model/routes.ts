export enum RZ_SEGMENTS {
  INSTINCTS = "instincts",
  INTELLECT = "intellect",
  BALANCE = "balance",
}

export type ContentCategory = "music" | "movies" | "books" | "art";

export type CategorizedRoutes = {
  readonly [Key in ContentCategory]: string;
};

export type RzRouteSegments = {
  readonly [Key in RZ_SEGMENTS]: CategorizedRoutes;
} & { readonly root: string };

export type Routes = {
  feed: string;
  radio: string;
  rz: RzRouteSegments;
};

function buildSegmentRoutes(segment: RZ_SEGMENTS): CategorizedRoutes {
  const segmentPath = `/rz/${segment}`;
  return {
    music: `${segmentPath}/music`,
    movies: `${segmentPath}/movies`,
    books: `${segmentPath}/books`,
    art: `${segmentPath}/art`,
  };
}

export const ROUTES = {
  feed: "/feed",
  radio: "/radio",
  rz: {
    root: "/rz",
    [RZ_SEGMENTS.INSTINCTS]: buildSegmentRoutes(RZ_SEGMENTS.INSTINCTS),
    [RZ_SEGMENTS.INTELLECT]: buildSegmentRoutes(RZ_SEGMENTS.INTELLECT),
    [RZ_SEGMENTS.BALANCE]: buildSegmentRoutes(RZ_SEGMENTS.BALANCE),
  },
} as const satisfies Routes;
