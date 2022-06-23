import { storageKeys } from "./storageKeys";

export const resetLocalStorage = () => {
  storageKeys.map((key) => localStorage.removeItem(key));
};
