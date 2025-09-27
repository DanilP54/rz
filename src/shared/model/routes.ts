export type NavSegments = (typeof NAV_SEGMENTS)[keyof typeof NAV_SEGMENTS];
export type SegmentCategory<S extends NavSegments> = (typeof SEGMENT_CATEGORIES)[S][number];
export type SegmentRoutes<S extends NavSegments> = Record<SegmentCategory<S>, string>;

export type Routes = {
  feed: string;
  radio: string;
  rz: { root: string } & { [S in NavSegments]: SegmentRoutes<S> };
};

export const NAV_SEGMENTS = {
  INSTINCTS: "instincts",
  INTELLECT: "intellect",
  BALANCE: "balance",
} as const;


export const SEGMENT_CATEGORIES = {
  [NAV_SEGMENTS.INSTINCTS]: ["music", "movies", "books", "art"] as const,
  [NAV_SEGMENTS.INTELLECT]: ["music", "movies", "books", "art"] as const,
  [NAV_SEGMENTS.BALANCE]: ["music", "movies", "books", "art"] as const,
} as const;


export const ROUTES = {
  feed: "/feed",
  radio: "/radio",
  rz: {
    root: "/rz",
    [NAV_SEGMENTS.INSTINCTS]: buildSegmentRoutes(NAV_SEGMENTS.INSTINCTS),
    [NAV_SEGMENTS.INTELLECT]: buildSegmentRoutes(NAV_SEGMENTS.INTELLECT),
    [NAV_SEGMENTS.BALANCE]: buildSegmentRoutes(NAV_SEGMENTS.BALANCE),
  },
} as const satisfies Routes;


function buildSegmentRoutes<S extends NavSegments>(
  segment: S
): SegmentRoutes<S> {
  return Object.fromEntries(
    SEGMENT_CATEGORIES[segment].map((category) => [
      category,
      `/rz/${segment}/${category}`,
    ])
  ) as SegmentRoutes<S>;
}
