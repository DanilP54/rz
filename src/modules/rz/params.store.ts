import type { Category, Segment } from "@/common/api/gen";
import { atom } from "nanostores";

export const $currentSegment = atom<Segment>(null as unknown as Segment);
export const $currentCategory = atom<Category>(null as unknown as Category);

export function initializeParams(segment: Segment, category: Category) {
  $currentSegment.set(segment);
  $currentCategory.set(category);
}
