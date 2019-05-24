import { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

function getViewportSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function useViewportSize() {
  const [viewportSize, setViewportUpdateVal] = useState(getViewportSize);

  useEffect(() => {
    const calcResize = debounce(
      () => setViewportUpdateVal(getViewportSize()),
      100,
    );

    window.addEventListener('resize', calcResize);

    return () => window.removeEventListener('resize', calcResize);
  }, []);

  return viewportSize;
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

    return () => observer.disconnect();
  }, [target, options, callback, enabled]);

  return value;
}

export function useElementNode<ElementType = HTMLElement>() {
  const [element, setElement] = useState<ElementType | null>(null);

  const elementRefCallback = useCallback((node: ElementType | null) => {
    if (node !== null) {
      setElement(node);
    }
  }, []);

  return [element, elementRefCallback] as const;
}
