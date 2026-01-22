// import { Category, GetCatalogQueryParams, Segment } from "@/common/api/gen";
// import { getInfinityQueryOptions } from "./query.options";
// import { useInfiniteQuery } from "@tanstack/react-query";

// export function useIniniteCatalogQuery(
//   category: Category,
//   params: GetCatalogQueryParams
// ) {
//   return useInfiniteQuery({
//     ...getInfinityQueryOptions(category, {
//       ...params,
//     }),
//     select: ({ pages }) => pages.flatMap((page) => page.items),
//     placeholderData: (prev) => prev,
//   });
// }
