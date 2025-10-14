import { NavigationHintKey, STORAGE_KEY } from "../lib/_use-hints-storage";

export const storageAdapter = () => ({
  update: (newValue: NavigationHintKey[]) => localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue)),
  get: () =>  JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as NavigationHintKey[],
  clear: () => localStorage.clear()
})