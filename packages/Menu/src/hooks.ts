import { useEffect } from 'react';

export function useDocumentEventListener(
  type: string,
  eventCallback: (e) => void,
  options?: object,
  dependencies: Array<any> = [type, eventCallback, options],
  enabled: boolean = true,
  element: HTMLElement | Document = document
) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    element.addEventListener(type, eventCallback, options);

    return () => {
      document.removeEventListener(type, eventCallback);
    };
  }, dependencies);
}
