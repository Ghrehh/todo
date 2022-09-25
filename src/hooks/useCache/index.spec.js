import { renderHook } from "@testing-library/react";
import CacheContext from "contexts/cache";
import CacheKeyObserver from "contexts/cache/Cache/CacheKeyObserver";
import useCache from "./";
import useForceUpdate from "./useForceUpdate";

jest.mock("contexts/cache/Cache/CacheKeyObserver");
jest.mock("./useForceUpdate");

describe("useCache", () => {
  let testContext = {};

  beforeEach(() => {
    testContext = {};

    testContext.cacheKeyObserverInstance = {
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
    };
    CacheKeyObserver.mockClear();
    CacheKeyObserver.mockImplementation(
      () => testContext.cacheKeyObserverInstance
    );

    testContext.forceUpdate = jest.fn();
    useForceUpdate.mockClear();
    useForceUpdate.mockImplementation(() => testContext.forceUpdate);

    testContext.cache = {
      get: jest.fn(() => "some data"),
      set: jest.fn(),
      merge: jest.fn(),
      addObserver: jest.fn(),
      removeObserver: jest.fn(),
    };

    const wrapper = ({ children }) => (
      <CacheContext.Provider value={testContext.cache}>
        {children}
      </CacheContext.Provider>
    );

    // eslint-disable-next-line testing-library/no-render-in-setup
    testContext.hook = renderHook(() => useCache("key", "a default value"), {
      wrapper,
    });
  });

  describe("set up", () => {
    it("instantiates a new observer", () => {
      expect(CacheKeyObserver).toHaveBeenCalledTimes(1);
      expect(CacheKeyObserver).toHaveBeenCalledWith(testContext.forceUpdate);
    });

    it("registers the observer", () => {
      expect(testContext.cache.addObserver).toHaveBeenCalledTimes(1);
      expect(testContext.cache.addObserver).toHaveBeenCalledWith(
        "key",
        testContext.cacheKeyObserverInstance
      );
    });

    it("subscribes to cache updates", () => {
      expect(
        testContext.cacheKeyObserverInstance.subscribe
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe("tear down", () => {
    beforeEach(() => {
      testContext.hook.unmount();
    });

    it("unsubscribes from cache updates", () => {
      expect(
        testContext.cacheKeyObserverInstance.unsubscribe
      ).toHaveBeenCalledTimes(1);
    });

    it("unregisters the observer", () => {
      expect(testContext.cache.removeObserver).toHaveBeenCalledTimes(1);
      expect(testContext.cache.removeObserver).toHaveBeenCalledWith(
        "key",
        testContext.cacheKeyObserverInstance
      );
    });
  });

  describe("value", () => {
    it("calls the cache get method", () => {
      expect(testContext.cache.get).toHaveBeenCalledTimes(1);
      expect(testContext.cache.get).toHaveBeenCalledWith(
        "key",
        "a default value"
      );
    });

    it("returns the value of the provided key in the cache", () => {
      expect(testContext.hook.result.current[0]).toEqual("some data");
    });
  });

  describe("set", () => {
    beforeEach(() => {
      testContext.hook.result.current[1]("set value");
    });

    it("calls the cache set method", () => {
      expect(testContext.cache.set).toHaveBeenCalledTimes(1);
      expect(testContext.cache.set).toHaveBeenCalledWith("key", "set value");
    });
  });

  describe("merge", () => {
    beforeEach(() => {
      testContext.hook.result.current[2]("merge value");
    });

    it("calls the cache merge method", () => {
      expect(testContext.cache.merge).toHaveBeenCalledTimes(1);
      expect(testContext.cache.merge).toHaveBeenCalledWith(
        "key",
        "merge value"
      );
    });
  });
});
