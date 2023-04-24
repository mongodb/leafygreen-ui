export const enter: unique symbol = Symbol();
export const exit: unique symbol = Symbol();

type Result<T, E = unknown> = { value: T } | { exception: E };

export class EnterException {
  exception: unknown;
  constructor(exception: unknown) {
    this.exception = exception;
  }
}

export class ExitException<TReturn> {
  exception: unknown;
  result: Result<TReturn>;
  constructor(exception: unknown, result: Result<TReturn>) {
    this.exception = exception;
    this.result = result;
  }
}

/**
 * An object implementing the `Context` interface has some notion of
 * "being entered" and always eventually "being exited". It should be used
 * together with the `within` function to enclose a function with a context.
 *
 * A "handle" is an object that can only assumed valid while within the
 * context. It should not be used after the context has exited and doing
 * so should be treated as undefined behavior.
 *
 * The `within` function will:
 *  - call the `enter` method exactly once.
 *  - call the `exit` exactly once and only after `enter` has been called.
 */
export interface Context<THandle> {
  [enter]: () => MaybePromise<THandle>;
  [exit]?: (handle: THandle) => MaybePromise<void>;
}

type ContextResult<
  TEnterResult extends MaybePromise<any>,
  TFnResult extends MaybePromise<any>,
  TExitResult extends MaybePromise<void>,
> = TFnResult extends PromiseLike<any>
  ? TFnResult
  : TEnterResult extends PromiseLike<any>
  ? PromiseLike<TFnResult>
  : TExitResult extends PromiseLike<any>
  ? PromiseLike<TFnResult>
  : TFnResult;

type MaybePromise<T> = T | PromiseLike<T>;

type Resolve<T extends MaybePromise<any>> = T extends MaybePromise<infer U>
  ? U
  : T;

function isPromiseLike<T>(obj: MaybePromise<T>): obj is PromiseLike<T> {
  return (
    obj != null &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    'then' in obj &&
    typeof obj.then === 'function'
  );
}

function handleMaybeAsyncException<
  TArgs extends Array<any>,
  TResolvedResult,
  TOnExceptionReturn,
>(
  fn: (...args: TArgs) => MaybePromise<TResolvedResult>,
  onException: (exception: unknown) => TOnExceptionReturn,
): (...args: TArgs) => MaybePromise<TResolvedResult | TOnExceptionReturn> {
  return (...args) => {
    try {
      const value = fn(...args);

      if (isPromiseLike(value)) {
        return Promise.resolve(value).catch(onException);
      }

      return value;
    } catch (exception) {
      return onException(exception);
    }
  };
}

function asyncCompose<
  TInnerArgs extends Array<any>,
  TResolvedResult,
  TOuterResult,
>(
  innerFn: (...args: TInnerArgs) => MaybePromise<TResolvedResult>,
  outerFn: (result: Resolve<TResolvedResult>) => TOuterResult,
): (...args: TInnerArgs) => MaybePromise<TOuterResult> {
  return (...args) => {
    const value = innerFn(...args);

    if (isPromiseLike(value)) {
      return value.then(outerFn as (arg: TResolvedResult) => TOuterResult);
    }

    return outerFn(value as Resolve<TResolvedResult>);
  };
}

export function within<
  TEnterResult extends MaybePromise<any>,
  TFnResult extends MaybePromise<any>,
  TExitResult extends MaybePromise<void> = void,
>(
  context: {
    [enter]: () => TEnterResult;
    [exit]?: (handler: Resolve<TEnterResult>) => TExitResult;
  },
  fn: (handler: Resolve<TEnterResult>) => TFnResult,
): ContextResult<TEnterResult, TFnResult, TExitResult> {
  return asyncCompose(
    handleMaybeAsyncException(context[enter], exception => {
      throw new EnterException(exception);
    }),
    handle =>
      asyncCompose(
        handleMaybeAsyncException(
          asyncCompose(fn, value => ({ value })),
          exception => ({ exception }),
        ),
        result =>
          asyncCompose(
            handleMaybeAsyncException(
              context[exit] ?? (() => {}),
              exception => {
                throw new ExitException(exception, result);
              },
            ),
            () => {
              if ('value' in result) {
                return result.value;
              }
              throw result.exception;
            },
          )(handle),
      )(handle),
  )() as ContextResult<TEnterResult, TFnResult, TExitResult>;
}
