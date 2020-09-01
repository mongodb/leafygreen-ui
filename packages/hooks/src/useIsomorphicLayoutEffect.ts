import { useEffect, useLayoutEffect } from 'react';

const useIsomorphicLayoutEffect: typeof useLayoutEffect = (...args) => {
  const effectHook =
    typeof window === 'undefined' ? useEffect : useLayoutEffect;
  return effectHook(...args);
};

export default useIsomorphicLayoutEffect;
