import { useEffect } from 'react';

export function useDocumentEventListener(
  type: string,
  eventCallback: (e) => void,
  options?: object,
  dependencies?: Array<any>,
  enabled: boolean = true,
) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    document.addEventListener(type, eventCallback, options);

    return () => {
      document.removeEventListener(type, eventCallback);
    };
  }, dependencies);
}
