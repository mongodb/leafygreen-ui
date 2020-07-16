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

type MaybeAsyncFunction<TArgs extends Array<any>, TReturn> =
  | ((...args: TArgs) => TReturn)
  | ((...args: TArgs) => PromiseLike<TReturn>);

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
  [enter]: MaybeAsyncFunction<[], THandle>;
  [exit]?: MaybeAsyncFunction<[THandle], void>;
}

type HandleFromEnter<
  TEnter extends MaybeAsyncFunction<[], any>
> = TEnter extends MaybeAsyncFunction<[], infer THandle> ? THandle : never;

interface BuildContext<
  TEnter extends MaybeAsyncFunction<[], any>,
  TExit extends MaybeAsyncFunction<[HandleFromEnter<TEnter>], void>
> {
  [enter]: TEnter;
  [exit]?: TExit;
}

// Can't deep resolve since TypeScript doesn't allow recursive type constructors
// Replace this with the upcoming `awaited T` type when it's released.
type ResolveShallow<T> = T extends PromiseLike<infer U> ? U : T;

/**
 * This helper ensures that the return value of `within` is typed
 * as `PromiseLike<TReturn>` since TypeScript doesn't know that
 * `PromiseLike<PromiseLike<TReturn>>` is impossible.
 */
type ContextResult<
  TContext extends Context<any>,
  TReturn
> = TContext[typeof enter] extends (...args: Array<any>) => PromiseLike<any>
  ? PromiseLike<ResolveShallow<TReturn>>
  : TContext[typeof exit] extends (...args: Array<any>) => PromiseLike<any>
  ? PromiseLike<ResolveShallow<TReturn>>
  : TReturn;

function handleResult<T>(result: Result<T>): T {
  if ('value' in result) {
    return result.value;
  }
  throw result.exception;
}

function isPromiseLike<T>(obj: PromiseLike<T> | T): obj is PromiseLike<T> {
  return (
    (typeof obj === 'object' || typeof obj === 'function') &&
    'then' in obj &&
    typeof obj.then === 'function'
  );
}

// This seems too sophisticated for TypeScript to figure out.
function castReturn<TContext extends Context<any>, TReturn>(
  value: TReturn | PromiseLike<TReturn>,
): ContextResult<TContext, TReturn> {
  return value as ContextResult<TContext, TReturn>;
}

export function within<
  // This is generic with respect to the enter method so that it becomes the
  // source of truth for the handle's type. Type exception(s) will occur on the
  // exit method or provided function if they don't have the correct handle type.
  TEnter extends MaybeAsyncFunction<[], any>,
  TExit extends MaybeAsyncFunction<[HandleFromEnter<TEnter>], void>,
  TReturn
>(
  context: BuildContext<TEnter, TExit>,
  fn: MaybeAsyncFunction<[HandleFromEnter<TEnter>], TReturn>,
): ContextResult<BuildContext<TEnter, TExit>, TReturn> {
  let handle: HandleFromEnter<TEnter> | PromiseLike<HandleFromEnter<TEnter>>;

  try {
    handle = context[enter]();
  } catch (exception) {
    throw new EnterException(exception);
  }

  if (isPromiseLike(handle)) {
    return castReturn(
      Promise.resolve(handle)
        .catch((exception: unknown) => {
          throw new EnterException(exception);
        })
        .then(performFn),
    );
  }

  return castReturn(performFn(handle));

  function performFn(handle: HandleFromEnter<TEnter>) {
    let result: Result<TReturn | PromiseLike<TReturn>>;

    try {
      result = { value: fn(handle) };
    } catch (exception) {
      result = { exception };
    }

    const exitContext = context[exit];

    if (!exitContext) {
      return handleResult(result);
    }

    if ('value' in result && isPromiseLike(result.value)) {
      return Promise.resolve(result.value)
        .then(value => ({ value }))
        .catch((exception: unknown) => ({ exception }))
        .then(async result => {
          try {
            await exitContext(handle);
          } catch (error) {
            throw new ExitException(error, result);
          }

          return handleResult(result);
        });
    } else {
      let exitContextPromise;

      try {
        exitContextPromise = exitContext(handle);
      } catch (error) {
        throw new ExitException(error, result);
      }

      if (exitContextPromise) {
        return Promise.resolve(exitContextPromise)
          .catch((error: unknown) => {
            throw new ExitException(error, result);
          })
          .then(() => handleResult(result));
      }

      return handleResult(result);
    }
  }
}
