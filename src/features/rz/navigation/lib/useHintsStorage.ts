import { useLocalStorage } from "usehooks-ts";
import {NavSegments} from "@/shared/model/routes";


export type NavigationHintIntroKey = "intro";
export type NavigationHintSegmentKey = NavSegments;
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
