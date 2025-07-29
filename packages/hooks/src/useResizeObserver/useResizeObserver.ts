import { useEffect, useRef, useState } from 'react';

interface Size {
  width: number;
  height: number;
}

interface UseResizeObserverProps<T extends HTMLElement = HTMLElement> {
  /** Optional React ref object pointing to the target element or the target element itself. */
  target?: React.RefObject<T> | T | null | undefined;
  /** Function to call when the size of the target element changes. */
  onResize?: (entry: ResizeObserverEntry) => void;
  /** Determines whether or not the hook should run, defaults to false. */
  disabled?: boolean;
}

interface UseResizeObserverReturnType<T extends HTMLElement = HTMLElement> {
  /** Ref to attach to the target element if no target is provided. */
  ref?: React.RefObject<T>;
  /** Current size of the target element, undefined if not observed or disabled. */
  size?: Size;
}

/**
 * Hook to observe changes in the size of a DOM element and fire a onResize.
 */
export const useResizeObserver = <T extends HTMLElement>({
  target,
  onResize,
  disabled = false,
}: UseResizeObserverProps<T>): UseResizeObserverReturnType<T> => {
  const internalTargetRef = useRef<T>(null);

  const [size, setSize] = useState<Size>();

  useEffect(() => {
    if (disabled) {
      return;
    }

    const targetElem = target
      ? target instanceof HTMLElement
        ? target
        : target.current
      : internalTargetRef.current;

    if (!targetElem) {
      return;
    }

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });

        if (onResize) {
          onResize(entry);
        }
      }
    });

    if (targetElem) {
      observer.observe(targetElem);
    }

    return () => {
      observer.disconnect();
    };
  }, [target, onResize, disabled]);

  return {
    ref: target ? undefined : internalTargetRef,
    size,
  };
};
