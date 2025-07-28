import { useEffect, useState } from 'react';

interface Size {
  width: number;
  height: number;
}

/**
 * Hook to observe changes in the size of a DOM element and fire a callback.
 * @param target React ref object pointing to the target element.
 * @param callback Function to call when the size of the target element changes.
 * @param disabled Determines whether or not the hook should run, defaults to false.
 */
export const useResizeObserver = <T extends HTMLElement>(
  target: HTMLElement | React.RefObject<T> | null,
  callback: (entry: ResizeObserverEntry) => void,
  disabled = false,
) => {
  const [size, setSize] = useState<Size>();

  useEffect(() => {
    if (disabled || !target) {
      return;
    }

    const targetElem = target instanceof HTMLElement ? target : target.current;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });

        callback(entry);
      }
    });

    if (targetElem) {
      observer.observe(targetElem);
    }

    return () => {
      observer.disconnect();
    };
  }, [target, callback, disabled]);

  return size;
};
