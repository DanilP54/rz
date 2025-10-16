export type NavSegments = (typeof NAV_SEGMENTS)[keyof typeof NAV_SEGMENTS];
export type SegmentCategory<S extends NavSegments> =
  (typeof SEGMENT_CATEGORIES)[S][number];
export type SegmentRoutes<S extends NavSegments> = Record<
  SegmentCategory<S>,
  string
>;

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
    [NAV_SEGMENTS.INSTINCTS]: buildRZSegmentRoutes(NAV_SEGMENTS.INSTINCTS),
    [NAV_SEGMENTS.INTELLECT]: buildRZSegmentRoutes(NAV_SEGMENTS.INTELLECT),
    [NAV_SEGMENTS.BALANCE]: buildRZSegmentRoutes(NAV_SEGMENTS.BALANCE),
  },
} as const;

export function getSegmentRoutePath<S extends NavSegments>(
  segment: NavSegments,
  category: SegmentCategory<S>
) {
  return ROUTES.rz[segment][category];
}

function buildRZSegmentRoutes<S extends NavSegments>(
  segment: S
): SegmentRoutes<S> {
  return Object.fromEntries(
    SEGMENT_CATEGORIES[segment].map((category) => [
      category,
      `/rz/${segment}/${category}`,
    ])
  ) as SegmentRoutes<S>;
}

export const getRzRoute = <S extends NavSegments>(
  segment: S,
  category: SegmentCategory<S>
) => {
  return ROUTES.rz[segment][category];
};
