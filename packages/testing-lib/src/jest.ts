import * as Context from './context';

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: Array<any>) => any ? never : K;
}[Exclude<keyof T, symbol | number>];

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: Array<any>) => any ? K : never;
}[Exclude<keyof T, symbol | number>];

export interface MethodSpyHandle<
  T extends {},
  M extends FunctionPropertyNames<T>
> extends jest.SpiedFunction<Required<T>[M]> {
  original: T[M];
  waitForCall: (
    matching?: (args: Parameters<T[M]>, ret: ReturnType<T[M]>) => boolean,
  ) => Promise<void>;
}

export interface GetterSpyHandle<
  T extends {},
  P extends NonFunctionPropertyNames<T>
> extends jest.SpyInstance<Required<T>[P], []> {
  original: T[P];
  waitForRead: (matching?: (ret: Required<T>[P]) => boolean) => Promise<void>;
}

export interface MethodSpyContextManager<
  T,
  M extends FunctionPropertyNames<T>
> {
  [Context.enter]: () => MethodSpyHandle<T, M>;
  [Context.exit]: (spy: MethodSpyHandle<T, M>) => void;
}

export interface GetterSpyContextManager<
  T,
  P extends NonFunctionPropertyNames<T>
> {
  [Context.enter]: () => GetterSpyHandle<T, P>;
  [Context.exit]: (spy: GetterSpyHandle<T, P>) => void;
}

export default {
  method<T, M extends FunctionPropertyNames<T>>(
    object: T,
    method: M,
  ): MethodSpyContextManager<T, M> {
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
  },

  getter<T, P extends NonFunctionPropertyNames<T>>(
    object: T,
    property: P,
  ): GetterSpyContextManager<T, P> {
    return {
      [Context.enter]: () => {
        const original = Object.getOwnPropertyDescriptor(object, property);

        const handle = Object.assign(jest.spyOn(object, property, 'get'), {
          waitForRead,
        });

        Object.defineProperty(
          handle,
          'original',
          original ?? { value: undefined },
        );

        return handle as GetterSpyHandle<T, P>;
      },
      [Context.exit]: spy => spy.mockRestore(),
    };
  },
};

function waitForCall<T extends {}, M extends FunctionPropertyNames<T>>(
  this: MethodSpyHandle<T, M>,
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

function waitForRead<T extends {}, P extends NonFunctionPropertyNames<T>>(
  this: GetterSpyHandle<T, P>,
  matching?: (ret: Required<T>[P]) => boolean,
): Promise<void> {
  return new Promise(resolve => {
    this.mockImplementationOnce(() => {
      const result = this.original;

      if (!matching || matching(result)) {
        resolve();
      }

      return result;
    });
  });
}
