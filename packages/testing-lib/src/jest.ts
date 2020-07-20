import * as Context from './context';

type FunctionPropertyNames<T> = {
  [K in Exclude<keyof T, symbol | number>]: T[K] extends (
    ...args: Array<any>
  ) => any
    ? K
    : never;
}[Exclude<keyof T, symbol | number>];

export interface SpyHandle<T extends {}, M extends FunctionPropertyNames<T>>
  extends jest.SpiedFunction<T[M]> {
  original: T[M];
  waitForCall: (
    matching?: (args: Parameters<T[M]>, ret: ReturnType<T[M]>) => boolean,
  ) => Promise<void>;
}

export interface SpyContextManager<
  T extends {},
  M extends FunctionPropertyNames<T>
> {
  [Context.enter]: () => SpyHandle<T, M>;
  [Context.exit]: (spy: SpyHandle<T, M>) => void;
}

export function spyContext<T extends {}, M extends FunctionPropertyNames<T>>(
  object: T,
  method: M,
): SpyContextManager<T, M> {
  return {
    [Context.enter]: () => {
      const spy: jest.SpiedFunction<T[M]> = jest.spyOn(object, method);

      return Object.assign(spy, {
        original: object[method],
        waitForCall,
      });
    },
    [Context.exit]: spy => spy.mockRestore(),
  };
}

function waitForCall<T extends {}, M extends FunctionPropertyNames<T>>(
  this: SpyHandle<T, M>,
  matching?: (args: Parameters<T[M]>, ret: ReturnType<T[M]>) => boolean,
): Promise<void> {
  return new Promise(resolve => {
    this.mockImplementationOnce((...args) => {
      const result = this.original(...args);

      if (!matching || matching(args, result)) {
        resolve();
      }

      return result;
    });
  });
}
