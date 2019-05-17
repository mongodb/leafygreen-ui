import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

function getWindowSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function useViewportSize() {
  const [windowSize, setWindowUpdateVal] = useState(getWindowSize);

  useEffect(() => {
    const calcResize = debounce(() => setWindowUpdateVal(getWindowSize()), 100);

    window.addEventListener('resize', calcResize);

    return () => window.removeEventListener('resize', calcResize);
  }, []);

  return windowSize;
}

type MutationHandler<Value> = (
  mutations: Array<MutationRecord>,
  observer: MutationObserver,
) => Value;

export function useMutationObserver<Value>(
  target: HTMLElement | null,
  options: MutationObserverInit,
  callback: MutationHandler<Value>,
  enabled: boolean = true,
): Value | undefined {
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new MutationObserver((...args) => {
      setValue(callback(...args));
    });

    if (target) {
      observer.observe(target, options);
    }

    return () => {
      observer.disconnect();
    };
  }, [target, options, callback, enabled]);

  return value;
}
