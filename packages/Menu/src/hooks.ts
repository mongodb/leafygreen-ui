import { useEffect } from 'react';

export function useDocumentEventListener(
  enabled: boolean,
  type: string,
  eventCallback: (e) => void,
  options?: object,
  dependencies?: Array<any>,
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
