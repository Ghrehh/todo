import { useCallback, useContext, useEffect } from "react";
import CacheContext from "contexts/cache";
import CacheKeyObserver from "contexts/cache/Cache/CacheKeyObserver";
import useForceUpdate from "./useForceUpdate";

const useCache = (key, defaultValue) => {
  const cache = useContext(CacheContext);
  const forceUpdate = useForceUpdate();
  const setData = useCallback(
    (newData) => cache.set(key, newData),
    [key, cache]
  );

  const mergeData = useCallback(
    (newData) => cache.merge(key, newData),
    [key, cache]
  );

  useEffect(() => {
    const observer = new CacheKeyObserver(forceUpdate);
    cache.addObserver(key, observer);
    observer.subscribe();

    return () => {
      observer.unsubscribe();
      cache.removeObserver(key, observer);
    };
  }, [key, cache, forceUpdate]);

  return [cache.get(key, defaultValue), setData, mergeData];
};

export default useCache;
