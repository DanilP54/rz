import { NavigationHintKey, STORAGE_KEY } from "../../lib/useHintsStorage";

export const getStoredHints = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as NavigationHintKey[];

export const setStoredHints = (newValue: NavigationHintKey[]) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
