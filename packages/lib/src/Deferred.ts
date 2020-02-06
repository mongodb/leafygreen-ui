export default class Deferred<T> {
  private _promise: Promise<T>;

  private _resolve: (val: T | PromiseLike<T>) => void;

  private _reject: (reason?: any) => void;

  constructor() {
    this._resolve = () => {};
    this._reject = () => {};

    this._promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  resolve(value: T) {
    this._resolve(value);
    return this;
  }

  reject(value: any) {
    this._reject(value);
    return this;
  }

  promise() {
    return this._promise;
  }

  then: Promise<T>['then'] = (...args) => {
    return this._promise.then(...args);
  };

  catch: Promise<T>['catch'] = (...args) => {
    return this._promise.catch(...args);
  };

  finally: Promise<T>['finally'] = cb => {
    return this._promise.finally(cb);
  };
}
