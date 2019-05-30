import { useEffect } from 'react';

export function useNativeEventListener(
  enabled: boolean,
  type: string,
  callback: (e) => void,
  options?: object,
  dependencies?: Array<any>,
) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    document.addEventListener(type, callback, options);

    return () => {
      document.removeEventListener(type, callback);
    };
  }, dependencies);
}
