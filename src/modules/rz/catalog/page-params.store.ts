import { Category, Segment } from "@/client";
import { atom, withInit } from "@reatom/core";

export let serverCategoryPageParam: Category;
export let serverSegmentPageParam: Segment;

type InitializePageState = {
  category: Category;
  segment: Segment;
}

export function initializePageParams(state: InitializePageState) {
  serverCategoryPageParam = state.category;
  serverSegmentPageParam = state.segment;
}

export const categoryPageParam = atom<Category>(
  undefined as any as Category,
  "categoryAtom"
).extend(withInit((state) => serverCategoryPageParam || state));

export const segmentPageParam = atom<Segment>(
  undefined as any as Segment,
  "segmentAtom"
).extend(withInit((state) => serverSegmentPageParam || state));
