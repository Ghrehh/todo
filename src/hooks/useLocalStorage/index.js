import { useCallback, useMemo } from "react";
import useCache from "hooks/useCache";
import { localStorage, crypto } from "utils/window";

const useLocalStorage = (key, defaultValue) => {
  // Shared cache key between all consumers of a local storage key, so that an update to one
  // will refresh them all.
  const [_, setCacheData] = useCache(
    `local-storage-updater-${key}`,
    crypto.randomUUID()
  );

  const setData = useCallback(
    (newData) => {
      localStorage.setItem(key, JSON.stringify(newData));
      setCacheData(crypto.randomUUID());
    },
    [setCacheData, key]
  );

  const data = useMemo(() => {
    const value = localStorage.getItem(key);

    if (value === null && defaultValue !== null) {
      setData(defaultValue);
      return defaultValue;
    }

    return JSON.parse(value);
  }, [defaultValue, key, setData]);

  return [data, setData];
};

export default useLocalStorage;
