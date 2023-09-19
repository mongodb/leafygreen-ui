/**
 * Based on https://github.com/fitzmode/use-dynamic-refs/blob/master/src/index.tsx
 */

import * as React from 'react';

import { consoleOnce } from '@leafygreen-ui/lib';

export interface UseDynamicRefsArgs {
  prefix: string;
}

export type RefMap<T> = Map<string, React.RefObject<T>>;

export type DynamicRefGetter<T> = (
  key?: string,
) => undefined | React.RefObject<T>;

// Create an object to track unique namespaced ref maps
const refNameSpaces: Record<string, RefMap<any>> = {};

/** Returns the namespace map for the given string */
function getNamespace<T>(namespace: string): RefMap<T> {
  if (refNameSpaces[namespace]) return refNameSpaces[namespace];
  refNameSpaces[namespace] = new Map<string, React.RefObject<T>>();
  return refNameSpaces[namespace];
}

/**
 * @internal
 */
export function getGetRef<T>(namespace = ''): DynamicRefGetter<T> {
  function getRef(): undefined;
  function getRef(key: string): React.RefObject<T>;
  function getRef(key?: string): React.RefObject<T> | undefined {
    if (!key) {
      consoleOnce.error(`useDynamicRefs: Cannot get ref without key`);
      return;
    }

    const namespaceMap = getNamespace<T>(namespace);

    if (namespaceMap.get(key)) {
      return namespaceMap.get(key) as React.RefObject<T>;
    }

    const ref = React.createRef<T>();
    namespaceMap.set(key, ref);
    return ref;
  }

  return getRef;
}

export function useDynamicRefs<T>({
  prefix,
}: UseDynamicRefsArgs): DynamicRefGetter<T> {
  return React.useMemo(() => getGetRef<T>(prefix), [prefix]);
}
