export default class CacheKeyObserver {
  #notifyCallback;
  #active = false;

  constructor(notifyCallback) {
    this.#notifyCallback = notifyCallback;
  }

  subscribe() {
    this.#active = true;
  }

  unsubscribe() {
    this.#active = false;
  }

  notify() {
    if (this.#active) this.#notifyCallback();
  }
}
