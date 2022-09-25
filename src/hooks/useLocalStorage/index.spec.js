import { renderHook } from "@testing-library/react";
import useLocalStorage from "hooks/useLocalStorage";
import useCache from "hooks/useCache";
import { localStorage } from "utils/window";

jest.mock("hooks/useCache");
jest.mock("utils/window", () => ({
  localStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
  crypto: { randomUUID: () => "uuid" },
}));

describe("useLocalStorage", () => {
  let testContext = {};

  beforeEach(() => {
    jest.resetAllMocks();
    testContext = {};

    testContext.useCacheSetter = jest.fn();

    useCache.mockClear();
    useCache.mockImplementation(() => [undefined, testContext.useCacheSetter]);

    localStorage.getItem.mockImplementation(() => null);

    // eslint-disable-next-line testing-library/no-render-in-setup
    testContext.hook = renderHook(() =>
      useLocalStorage("key", "a default value")
    );
  });

  describe("set up", () => {
    it("calls useCache", () => {
      expect(useCache).toHaveBeenCalledTimes(1);
      expect(useCache).toHaveBeenCalledWith(
        "local-storage-updater-key",
        "uuid"
      );
    });

    it("calls getItem", () => {
      expect(localStorage.getItem).toHaveBeenCalledTimes(1);
      expect(localStorage.getItem).toHaveBeenCalledWith("key");
    });

    it("calls setItem", () => {
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "key",
        JSON.stringify("a default value")
      );
    });

    it("calls the useCache setter", () => {
      expect(testContext.useCacheSetter).toHaveBeenCalledTimes(1);
      expect(testContext.useCacheSetter).toHaveBeenCalledWith("uuid");
    });
  });
});
