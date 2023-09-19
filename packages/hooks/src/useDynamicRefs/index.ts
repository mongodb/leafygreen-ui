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

export type DynamicRefNamespace<T> = Record<string, RefMap<T>>;

// Create an object to track unique namespaced ref maps
const refNameSpaces: DynamicRefNamespace<any> = {};

/**
 * Returns the namespace map for the given string
 *
 * @internal
 */
function getNamespace<T>(namespace: string): RefMap<T> {
  if (refNameSpaces[namespace]) return refNameSpaces[namespace];
  refNameSpaces[namespace] = new Map<string, React.RefObject<T>>();
  return refNameSpaces[namespace];
}

/**
 * @internal
 */
export function getGetRef<T>(prefix: string) {
  /**
   * Returns a ref (or creates a new one) for the provided key
   */
  function getRef(): undefined;
  function getRef(key: string): React.RefObject<T>;
  function getRef(key?: string): React.RefObject<T> | undefined {
    if (!key) {
      consoleOnce.error(`useDynamicRefs: Cannot get ref without key`);
      return;
    }

    const namespaceMap = getNamespace<T>(prefix);

    if (namespaceMap.get(key)) {
      return namespaceMap.get(key) as React.RefObject<T>;
    }

    const ref = React.createRef<T>();
    namespaceMap.set(key, ref);
    return ref;
  }

  return getRef;
}

/** The function signature for the function returned by `useDynamicRefs` */
export type DynamicRefGetter<T> = ReturnType<typeof getGetRef<T>>;

/** Maintain a map of all getters to ensure uniqueness */
const getterMap = new Map<string, DynamicRefGetter<unknown>>();

/**
 * Returns a ref "getter" function for the specified namespace (prefix).
 *
 * Calling the ref "getter" with a key will return a ref for the given namespace and key
 */
export function useDynamicRefs<T>({
  prefix,
}: UseDynamicRefsArgs): DynamicRefGetter<T> {
  if (getterMap.get(prefix)) {
    const getter = getterMap.get(prefix);
    return getter as DynamicRefGetter<T>;
  }

  const getter = getGetRef<T>(prefix);
  getterMap.set(prefix, getter);
  return getter;
}
