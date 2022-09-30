import { useCallback } from "react";
import useCache from "hooks/useCache";
import { localStorage } from "utils/window";

const useLocalStorage = (key, defaultValue) => {
  const unparsedLocalStorageData = localStorage.getItem(key);
  if (unparsedLocalStorageData === null && defaultValue !== null) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
  }

  // Shared cache key between all consumers of a local storage key, so that an update to one
  // will refresh them all.
  const [cacheData, setCacheData] = useCache(
    `local-storage-updater-${key}`,
    JSON.parse(localStorage.getItem(key))
  );

  const setData = useCallback(
    (newData) => {
      localStorage.setItem(key, JSON.stringify(newData));
      setCacheData(newData);
    },
    [setCacheData, key]
  );

  return [cacheData, setData];
};

export default useLocalStorage;
