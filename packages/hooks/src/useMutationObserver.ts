import { useEffect, useState } from 'react';

type MutationHandler<Value> = (
  mutations: Array<MutationRecord>,
  observer: MutationObserver,
) => Value;

export default function useMutationObserver<Value>(
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
