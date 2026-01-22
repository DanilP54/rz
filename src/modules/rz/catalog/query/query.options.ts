// import { Category, GetCatalogQueryParams, Segment } from "@/common/api/gen";
// import { infiniteQueryOptions } from "@tanstack/react-query";
// import { getCatalog } from "../api/api.catalog";

// export const DEFAULT_LIMIT = 30;

// export function getInfinityQueryOptions(
//   category: Category,
//   params: GetCatalogQueryParams
// ) {
//   return infiniteQueryOptions({
//     queryKey: ["catalog", category, params],
//     queryFn: ({ pageParam, signal }) => {
//       return getCatalog(
//         category,
//         {
//           ...params,
//           page: pageParam as number,
//           limit: DEFAULT_LIMIT,
//         },
//         { signal }
//       );
//     },
//     initialPageParam: 1,
//     getNextPageParam: (lastPage) => {
//       if (!lastPage.meta.hasNextPage) {
//         return undefined;
//       }
//       return lastPage.meta.currentPage + 1;
//     },
//   });
// }

