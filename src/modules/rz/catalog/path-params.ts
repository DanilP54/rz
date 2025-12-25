// path-params.ts
import { Category, Segment } from "@/common/api/gen";
import { atom, withInit } from "@reatom/core";

let serverCategory: Category;
let serverSegment: Segment;

export function initializeParamsState(category: Category, segment: Segment) {
  serverCategory = category;
  serverSegment = segment;
}

// Добавляем строковые имена и убираем | undefined из типа
export const categoryAtom = atom<Category>(
  undefined as any as Category, 
  "categoryAtom"
).extend(withInit((state) => serverCategory || state));

export const segmentAtom = atom<Segment>(
  undefined as any as Segment, 
  "segmentAtom"
).extend(withInit((state) => serverSegment || state));