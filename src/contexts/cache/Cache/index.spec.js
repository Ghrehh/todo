import Cache from "./";

describe("Cache", () => {
  let testContext = {};

  beforeEach(() => {
    testContext = {};
    testContext.cache = new Cache();
  });

  describe("get", () => {
    describe("using a key that doesn't exist", () => {
      beforeEach(() => {
        testContext.result = testContext.cache.get("foo");
      });

      it("adds the key", () => {
        expect(testContext.cache.keys.foo).toEqual({
          observers: [],
          data: null,
        });
      });

      it("returns null", () => {
        expect(testContext.result).toBeNull();
      });
    });

    describe("using a key that exists", () => {
      beforeEach(() => {
        testContext.cache.keys.foo = { observers: [], data: "data" };
        testContext.result = testContext.cache.get("foo");
      });

      it("returns the data", () => {
        expect(testContext.result).toEqual("data");
      });
    });
  });

  describe("merge", () => {
    describe("using a key that doesn't exist", () => {
      beforeEach(() => {
        testContext.cache.merge("foo", { one: 1, two: 2 });
      });

      it("adds the key and data", () => {
        expect(testContext.cache.keys.foo).toEqual({
          observers: [],
          data: { one: 1, two: 2 },
        });
      });
    });

    describe("using a key that exists", () => {
      beforeEach(() => {
        testContext.observer = { notify: jest.fn() };
        testContext.cache.keys.foo = {
          observers: [testContext.observer],
          data: { one: 1, two: 2 },
        };
        testContext.cache.merge("foo", { one: 10 });
      });

      it("overwrites the data", () => {
        expect(testContext.cache.keys.foo).toEqual({
          observers: [testContext.observer],
          data: { one: 10, two: 2 },
        });
      });

      it("calls any observers on the key", () => {
        expect(testContext.observer.notify).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("set", () => {
    describe("using a key that doesn't exist", () => {
      beforeEach(() => {
        testContext.cache.set("foo", "data");
      });

      it("adds the key and data", () => {
        expect(testContext.cache.keys.foo).toEqual({
          observers: [],
          data: "data",
        });
      });
    });

    describe("using a key that exists", () => {
      beforeEach(() => {
        testContext.observer = { notify: jest.fn() };
        testContext.cache.keys.foo = {
          observers: [testContext.observer],
          data: "data",
        };
        testContext.cache.set("foo", "new data");
      });

      it("overwrites the data", () => {
        expect(testContext.cache.keys.foo).toEqual({
          observers: [testContext.observer],
          data: "new data",
        });
      });

      it("calls any observers on the key", () => {
        expect(testContext.observer.notify).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("addObserver", () => {
    describe("using a key that doesn't exist", () => {
      beforeEach(() => {
        testContext.observer = {};
        testContext.cache.addObserver("foo", testContext.observer);
      });

      it("adds the key and observer", () => {
        expect(testContext.cache.keys.foo).toEqual({
          observers: [testContext.observer],
          data: null,
        });
      });
    });

    describe("using a key that exists", () => {
      beforeEach(() => {
        testContext.newObserver = {};
        testContext.oldObserver = {};

        testContext.cache.keys.foo = {
          observers: [testContext.oldObserver],
          data: "data",
        };
        testContext.cache.addObserver("foo", testContext.newObserver);
      });

      it("adds the observer to the key", () => {
        expect(testContext.cache.keys.foo).toEqual({
          observers: [testContext.oldObserver, testContext.newObserver],
          data: "data",
        });
      });
    });
  });

  describe("removeObserver", () => {
    describe("using a key that doesn't exist", () => {
      it("throws an error", () => {
        expect(() => testContext.cache.removeObserver("foo", {})).toThrowError(
          "Key foo doesn't exist"
        );
      });
    });

    describe("using a key that exists", () => {
      beforeEach(() => {
        testContext.observerToRemove = {};
        testContext.observerToKeep = {};
        testContext.cache.keys.foo = {
          observers: [testContext.observerToRemove, testContext.observerToKeep],
          data: "data",
        };
      });

      describe("and the provided observer is on that key", () => {
        beforeEach(() => {
          testContext.cache.removeObserver("foo", testContext.observerToRemove);
        });

        it("removes the observer", () => {
          expect(testContext.cache.keys.foo).toEqual({
            observers: [testContext.observerToKeep],
            data: "data",
          });
        });
      });

      describe("and the provided observer is not on that key", () => {
        it("throws an error", () => {
          expect(() =>
            testContext.cache.removeObserver("foo", {})
          ).toThrowError("Observer doesn't exist on key foo");
        });
      });
    });
  });
});
