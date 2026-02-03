import type { Segment } from "@/common/api/client";
import { useLocalStorage } from "usehooks-ts";



export type NavigationHintIntroKey = "intro";
export type NavigationHintSegmentKey = Segment;
export type NavigationHintKey = NavigationHintSegmentKey | NavigationHintIntroKey;

export const STORAGE_KEY = 'seenHint'

export interface HintsStorage {
  isEmpty(): boolean,
  save(hint: NavigationHintKey): void,
  isSeen(hint: NavigationHintKey): boolean,
}

export const useHintsStorage = (): HintsStorage => {
  const [seenHint, setSeenHint] = useLocalStorage<NavigationHintKey[]>(STORAGE_KEY, []);

  const isSeen = (hint: NavigationHintKey) => {
    return seenHint.includes(hint);
  };

  const save = (hint: NavigationHintKey) => {
    setSeenHint((prev) => [...prev, hint]);
  };

  const isEmpty = () => {
    return seenHint.length === 0
  }
  return {
    isEmpty, 
    isSeen,
    save,
  };
};
