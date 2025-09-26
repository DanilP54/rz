// export enum RZ_SEGMENTS {
//   INSTINCTS = "instincts",
//   INTELLECT = "intellect",
//   BALANCE = "balance",
// }

// export const NAV_SEGMENTS = {
//   INSTINCTS: "instincts",
//   INTELLECT: "intellect",
//   BALANCE: "balance",
// } as const;

// export type NavSegments =
//   (typeof NAV_SEGMENTS)[keyof typeof NAV_SEGMENTS];

// export type NavContentCategory = "music" | "movies" | "books" | "art";

// export type CategorizedRoutes = {
//   readonly [Key in NavContentCategory]: string;
// };

// export type RzRouteSegments = {
//   readonly [Key in NavSegments]: CategorizedRoutes;
// } & { readonly root: string };

// export type Routes = {
//   feed: string;
//   radio: string;
//   rz: RzRouteSegments;
// };

// function buildSegmentRoutes(segment: NavSegments): CategorizedRoutes {
//   const segmentPath = `/rz/${segment}`;
//   return {
//     music: `${segmentPath}/music`,
//     movies: `${segmentPath}/movies`,
//     books: `${segmentPath}/books`,
//     art: `${segmentPath}/art`,
//   };
// }

// export const ROUTES = {
//   feed: "/feed",
//   radio: "/radio",
//   rz: {
//     root: "/rz",
//     [NAV_SEGMENTS.INSTINCTS]: buildSegmentRoutes(
//       NAV_SEGMENTS.INSTINCTS
//     ),
//     [NAV_SEGMENTS.INTELLECT]: buildSegmentRoutes(
//       NAV_SEGMENTS.INTELLECT
//     ),
//     [NAV_SEGMENTS.BALANCE]: buildSegmentRoutes(NAV_SEGMENTS.BALANCE),
//   },
// } as const satisfies Routes;

// Тип сегмента
export type NavSegments = (typeof NAV_SEGMENTS)[keyof typeof NAV_SEGMENTS];

// Тип категории для конкретного сегмента
export type SegmentCategory<S extends NavSegments> = (typeof SEGMENT_CATEGORIES)[S][number];

// Тип маршрутов внутри сегмента
export type SegmentRoutes<S extends NavSegments> = Record<
  SegmentCategory<S>,
  string
>;

// Тип маршрутов для всех сегментов
export type Routes = {
  feed: string;
  radio: string;
  rz: { root: string } & { [S in NavSegments]: SegmentRoutes<S> };
};

// Централизованные сегменты
export const NAV_SEGMENTS = {
  INSTINCTS: "instincts",
  INTELLECT: "intellect",
  BALANCE: "balance",
} as const;

// Уникальные категории для каждого сегмента
export const SEGMENT_CATEGORIES = {
  [NAV_SEGMENTS.INSTINCTS]: ["music", "movies", "books", "art"] as const,
  [NAV_SEGMENTS.INTELLECT]: ["music", "movies", "books", "art"] as const,
  [NAV_SEGMENTS.BALANCE]: ["music", "movies", "books", "art"] as const,
} as const;

// Основные маршруты
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

// Вспомогательная функция для генерации маршрутов по сегменту
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
