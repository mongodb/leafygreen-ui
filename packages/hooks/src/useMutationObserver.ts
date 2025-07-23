import { useEffect, useState } from 'react';

type MutationHandler<Value> = (
  mutations: Array<MutationRecord>,
  observer: MutationObserver,
) => Value;

/**
 * Hook to subscribe to changes on the DOM.
 * @param target HTML element that is subscribed to DOM changes.
 * @param options Object with information about what DOM changes to subscribe to.
 * @param callback Callback function to execute inside of MutationObserver instance.
 * @param enabled Determines whether or not the hook should run, defaults to true.
 */
export default function useMutationObserver<Value>(
  target: HTMLElement | null,
  options: MutationObserverInit,
  callback: MutationHandler<Value>,
  enabled = true,
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
