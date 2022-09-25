export default class Cache {
  keys = {};

  get(key, defaultValue = null) {
    this.#ensureKeyExists(key);
    if (this.keys[key].data === null) this.keys[key].data = defaultValue;
    return this.keys[key].data;
  }

  set(key, newData) {
    this.#ensureKeyExists(key);
    this.keys[key].data = newData;
    this.keys[key].observers.forEach((observer) => observer.notify());
  }

  merge(key, newData) {
    this.#ensureKeyExists(key);
    this.keys[key].data = { ...this.keys[key].data, ...newData };
    this.keys[key].observers.forEach((observer) => observer.notify());
  }

  addObserver(key, observer) {
    this.#ensureKeyExists(key);
    this.keys[key].observers.push(observer);
  }

  removeObserver(key, observerToRemove) {
    if (!this.keys[key]) throw new Error(`Key ${key} doesn't exist`);

    const newObserversForKey = this.keys[key].observers.filter(
      (observer) => observer !== observerToRemove
    );

    if (newObserversForKey.length === this.keys[key].observers.length) {
      throw new Error(`Observer doesn't exist on key ${key}`);
    }

    this.keys[key].observers = newObserversForKey;
  }

  #ensureKeyExists(key) {
    if (!this.keys[key]) {
      this.keys[key] = {
        observers: [],
        data: null,
      };
    }
  }
}
