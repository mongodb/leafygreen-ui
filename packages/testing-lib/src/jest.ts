import * as Context from './context';

type FunctionPropertyNames<T> = {
  [K in Exclude<keyof T, symbol | number>]: T[K] extends (
    ...args: Array<any>
  ) => any
    ? K
    : never;
}[Exclude<keyof T, symbol | number>];

export interface SpyContextManager<
  T extends {},
  M extends FunctionPropertyNames<T>
> {
  [Context.enter]: () => jest.SpiedFunction<T[M]>;
  [Context.exit]: (spy: jest.SpiedFunction<T[M]>) => void;
}

export function spyContext<T extends {}, M extends FunctionPropertyNames<T>>(
  object: T,
  method: M,
): SpyContextManager<T, M> {
  return {
    [Context.enter]: () => jest.spyOn(object, method),
    [Context.exit]: spy => spy.mockRestore(),
  };
}
