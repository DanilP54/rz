import {
  action,
  atom,
  computed,
  memoKey,
  wrap,
} from "@reatom/core";
import { catalogFilters } from "../filters";
import { categoryPageParam, segmentPageParam } from "../page-params.store";
import { CatalogItem, Category } from "@/common/api/gen";
import { getCatalog } from "../api/api.catalog";

const dataAtom = atom<CatalogItem[]>([], "catalog.data");

const isFirstLoadAtom = atom(true, "catalog.isFirstLoad");
const isFetchNextPage = atom(false, 'catalog.isFetchNextPage')

export const catalogInfiniteQuery = computed(() => {
  const filters = catalogFilters();
  const segment = segmentPageParam();
  const category = categoryPageParam();

  const key = JSON.stringify(
    Object.entries({ category, segment, ...filters }).sort(([k1], [k2]) =>
      k1.localeCompare(k2)
    )
  );

  const result =  memoKey(key, () => {
    const pageAtom = atom(1, "catalog.page");
    const cacheDataAtom = atom<CatalogItem[]>([], "catalog.data");
    const hasMoreAtom = atom(true, "catalog.hasMore");
    const isLoadingAtom = atom(false, "catalog.isLoading");

    const loadNextFn = action(async () => {
      if (isLoadingAtom() || !hasMoreAtom()) return;
      isLoadingAtom.set(true);

      if(cacheDataAtom().length !== 0) {
        isFetchNextPage.set(true)
      }

      try {
        const currentPage = pageAtom();
        const response = await wrap(
          getCatalog(category, {
            segment,
            ...filters,
            page: currentPage,
            limit: 30,
          })
        );
  
        cacheDataAtom.set((prev) => [...prev, ...response.items]);

        pageAtom.set(pageAtom() + 1);
        hasMoreAtom.set(response.meta.hasNextPage);
        if (isFirstLoadAtom()) {
          isFirstLoadAtom.set(false);
        }

        return response.items;
      } catch (err) {
        console.error("Failed to load products:", err);
        throw err;
      } finally {
        isLoadingAtom.set(false);
        if(isFetchNextPage()) {
          isFetchNextPage.set(false)
        }
      }
    }, "catalog.loadNext");

    loadNextFn();

    return {
      cache: cacheDataAtom,
      loadNextFn,
      isLoading: isLoadingAtom,
      isFetchNextPage,
      isFirstLoading: isFirstLoadAtom,
      hasMore: hasMoreAtom,
    };
  });

  if(!result.isLoading()) {
    dataAtom.set(result.cache())
  }

  return {
    ...result,
    data: dataAtom
  }
});

// export const loadNextFn = action(async () => {
//   const filters = catalogFilters();
//   const segment = segmentPageParam();
//   const category = categoryPageParam();
//   const currentPage = pageAtom();

//   return await wrap(
//     getCatalog(category, {
//       segment,
//       ...filters,
//       page: currentPage,
//       limit: 30,
//     })
//   );
// }, "catalog.loadNext").extend(withAsyncData({ initState: [], status: true }));

// const loadNextFn = action(async () => {
//     if (isLoadingAtom() || !hasMoreAtom()) return;
//     isLoadingAtom.set(true);
//     try {
//       const currentPage = pageAtom();
//       const response = await wrap(
//         getCatalog(category, {
//           segment,
//           ...filters,
//           page: currentPage,
//           limit: 30,
//         })
//       );

//       dataAtom.set((prev) => [...prev, ...response.items]);

//       pageAtom.set(pageAtom() + 1);
//       hasMoreAtom.set(response.meta.hasNextPage);
//       if (isFirstLoadAtom()) {
//         isFirstLoadAtom.set(false);
//       }

//       return response.items;
//     } catch (err) {
//       console.error("Failed to load products:", err);
//       throw err;
//     } finally {
//       isLoadingAtom.set(false);
//     }
//   }, "catalog.loadNext").extend(
//     withAsyncData({ initState: [], status: true })
//   );

//   loadNextFn();

//   return {
//     data: dataAtom,
//     loadNextFn,
//     isLoading: isLoadingAtom,
//     isFirstLoading: isFirstLoadAtom,
//     hasMore: hasMoreAtom,
//   };
