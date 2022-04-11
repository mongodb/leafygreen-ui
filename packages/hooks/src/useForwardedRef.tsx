import { useCallback, useMemo, useRef } from 'react';

// Ported from Select/utils
// TODO: - remove duplicated code from Select/utils
export function useObservedRef<T>(
  callback: (value: T) => void,
  initialValue: T,
  options: { initialValue: T; deps?: React.DependencyList },
): React.MutableRefObject<T>;
export function useObservedRef<T>(
  callback: (value: T) => void,
  options?: { initialValue: T | null; deps?: React.DependencyList },
): React.RefObject<T>;
export function useObservedRef<T>(
  callback: (value: T | undefined) => void,
  options?: { deps?: React.DependencyList },
): React.MutableRefObject<T>;
export function useObservedRef<T>(
  callback: (value: T | null | undefined) => void,
  {
    initialValue,
    deps = [],
  }: { initialValue?: T | null; deps?: React.DependencyList } = {},
) {
  const ref = useRef(initialValue);

  return useMemo(
    () => ({
      get current() {
        return ref.current;
      },
      set current(nextValue) {
        ref.current = nextValue;
        callback(nextValue);
      },
    }),
    [
      callback,
      ref,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ...deps,
    ],
  );
}

type SettableRef<T> = React.RefCallback<T> | React.MutableRefObject<T>;

type ValueOrArray<T> = T | ReadonlyArray<T>;

export function useForwardedRef<T>(
  forwardedRefOrRefs: ValueOrArray<SettableRef<T> | null>,
  initialValue: T,
): React.MutableRefObject<T>;
export function useForwardedRef<T>(
  forwardedRefOrRefs: ValueOrArray<SettableRef<T | null> | null>,
  initialValue: T | null,
): React.RefObject<T>;
export function useForwardedRef<T>(
  forwardedRefOrRefs: ValueOrArray<SettableRef<T | null | undefined> | null>,
  initialValue?: T | null,
): React.MutableRefObject<T | null | undefined> {
  const forwardValueToRefs = useCallback(
    <T,>(
      forwardedRefOrRefs: ValueOrArray<SettableRef<T> | null>,
      nextValue: T,
    ) => {
      if (Array.isArray(forwardedRefOrRefs)) {
        forwardedRefOrRefs.forEach(forwardValueToRefs);
      } else if (typeof forwardedRefOrRefs === 'function') {
        forwardedRefOrRefs(nextValue);
      } else if (forwardedRefOrRefs) {
        // @ts-expect-error https://github.com/microsoft/TypeScript/issues/40527
        forwardedRefOrRefs.current = nextValue;
      }
    },
    [],
  );

  return useObservedRef(
    useCallback(
      value => forwardValueToRefs(forwardedRefOrRefs, value),
      [forwardedRefOrRefs, forwardValueToRefs],
    ),
    { initialValue },
  );
}
