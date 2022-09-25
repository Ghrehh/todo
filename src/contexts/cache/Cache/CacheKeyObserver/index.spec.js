import CacheKeyObserver from "./";

describe("CacheKeyObserver", () => {
  let testContext = {};

  beforeEach(() => {
    testContext = {};
    testContext.notifyCallback = jest.fn();
    testContext.observer = new CacheKeyObserver(testContext.notifyCallback);
  });

  describe("not subscribing", () => {
    beforeEach(() => {
      testContext.observer.notify();
    });

    it("does not call the notifyCallback", () => {
      expect(testContext.notifyCallback).not.toHaveBeenCalled();
    });
  });

  describe("subscribing", () => {
    beforeEach(() => {
      testContext.observer.subscribe();
      testContext.observer.notify();
    });

    it("calls the notifyCallback", () => {
      expect(testContext.notifyCallback).toHaveBeenCalledTimes(1);
    });
  });

  describe("unsubscribing", () => {
    beforeEach(() => {
      testContext.observer.subscribe();
      testContext.observer.unsubscribe();
      testContext.observer.notify();
    });

    it("does not call the notifyCallback", () => {
      expect(testContext.notifyCallback).not.toHaveBeenCalled();
    });
  });
});
