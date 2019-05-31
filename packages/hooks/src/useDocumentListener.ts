import { useEffect } from 'react';

export default function useDocumentEventListener(
  enabled: boolean = true,
  type: string,
  eventCallback: EventListener,
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
