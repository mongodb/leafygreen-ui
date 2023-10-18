/**
 * Based on https://github.com/fitzmode/use-dynamic-refs/blob/master/src/index.tsx
 */

import * as React from 'react';

import { consoleOnce } from '@leafygreen-ui/lib';

export interface UseDynamicRefsArgs {
  prefix: string;
}

/** The Map type for a given ref object  */
export type RefMap<T> = Map<string, React.RefObject<T>>;

/**
 * @internal
 */
export function getGetRef<T>(refMap: RefMap<T>) {
  /**
   * Returns a ref (or creates a new one) for the provided key
   */
  function getRef(): undefined;
  function getRef(key: string): React.RefObject<T>;
  function getRef(key?: string): React.RefObject<T> | undefined {
    if (!key) {
      consoleOnce.error('`useDynamicRefs`: Cannot get ref without key');
      return;
    }

    if (refMap.get(key)) {
      return refMap.get(key) as React.RefObject<T>;
    }

    const ref = React.createRef<T>();
    refMap.set(key, ref);
    return ref;
  }

  return getRef;
}

/** The function signature for the function returned by `useDynamicRefs` */
export type DynamicRefGetter<T> = ReturnType<typeof getGetRef<T>>;

/**
 * Returns a ref "getter" function for the specified namespace (prefix).
 *
 * Calling the ref "getter" with a key will return a ref for the given namespace and key
 */
export function useDynamicRefs<T>(
  args?: UseDynamicRefsArgs,
): DynamicRefGetter<T> {
  const prefix = args?.prefix;

  const getRef = React.useMemo(() => {
    const refMap: RefMap<T> = new Map<string, React.RefObject<T>>();
    const getter = getGetRef<T>(refMap);
    return getter;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefix]);

  return getRef;
}
