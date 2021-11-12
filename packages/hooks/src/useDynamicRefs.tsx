/**
 * From https://github.com/fitzmode/use-dynamic-refs/blob/master/src/index.tsx
 *
 * There's a bug in the original package
 *
 * Consider moving this to `/hooks`
 */

import * as React from 'react';

const map = new Map<string, React.RefObject<unknown>>();

function setRef(): undefined;
function setRef<T>(key: string): React.RefObject<T>;

function setRef<T>(key?: string): React.RefObject<T> | undefined {
  if (!key) {
    console.error(`useDynamicRefs: Cannot set ref without key `);
    return;
  }

  if (map.get(key)) {
    return getRef<T>(key);
  }

  const ref = React.createRef<T>();
  map.set(key, ref);
  return ref;
}

function getRef(): undefined;
function getRef<T>(key: string): React.RefObject<T>;

function getRef<T>(key?: string): React.RefObject<T> | undefined {
  if (!key) {
    console.error(`useDynamicRefs: Cannot get ref without key`);
    return;
  }

  if (map.get(key)) {
    return map.get(key) as React.RefObject<T>;
  }

  return setRef<T>(key);
}

function useDynamicRefs<T>(): [
  (key?: string) => undefined | React.RefObject<T>,
  (key?: string) => undefined | React.RefObject<T>,
] {
  return [getRef, setRef];
}

export default useDynamicRefs;
