/**
 * From https://github.com/fitzmode/use-dynamic-refs/blob/master/src/index.tsx
 *
 * There's a bug in the original package
 *
 * Consider moving this to `/hooks`
 */

import * as React from 'react';

const map = new Map<string, React.RefObject<unknown>>();

function getGetRef<T>(prefix = '') {
  function getRef(): undefined;
  function getRef(key: string): React.RefObject<T>;
  function getRef(key?: string): React.RefObject<T> | undefined {
    if (!key) {
      console.error(`useDynamicRefs: Cannot get ref without key`);
      return;
    }

    const fullKey = prefix + '-' + key;

    if (map.get(fullKey)) {
      return map.get(fullKey) as React.RefObject<T>;
    }

    const ref = React.createRef<T>();
    map.set(fullKey, ref);
    return ref;
  }

  return getRef;
}

function useDynamicRefs<T>({
  prefix,
}: {
  prefix: string;
}): (key?: string) => undefined | React.RefObject<T> {
  return getGetRef<T>(prefix);
}

export default useDynamicRefs;
