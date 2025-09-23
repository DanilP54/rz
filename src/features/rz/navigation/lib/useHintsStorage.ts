import { useLocalStorage } from "usehooks-ts";
import {RZ_SEGMENTS} from "@/shared/model/routes";

export type NavigationHints = RZ_SEGMENTS | "intro";

export interface HintsStorage {
  isEmpty(): boolean,
  save(hint: NavigationHints): void,
  isSeen(hint: NavigationHints): boolean,
}

export const STORAGE_KEY = 'seenHint'

export const useHintsStorage = (): HintsStorage => {
  const [seenHint, setSeenHint] = useLocalStorage<NavigationHints[]>(STORAGE_KEY, []);

  const isSeen = (hint: NavigationHints) => {
    return seenHint.includes(hint);
  };

  const save = (hint: NavigationHints) => {
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
