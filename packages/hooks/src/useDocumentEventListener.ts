import { useEffect } from 'react';

/**
 * Hook to subscribe to an event listener.
 * @param type Represents the event type to listen for.
 * @param eventCallback Event listener callback function.
 * @param enabled Determines whether or not the hook should run, defaults to true.
 * @param options Optional parameter to specify options passed to the eventListener.
 * @param dependencies Optional array to be passed to useEffect hook, such that the hook will only run if the array's values have changed.
 */
export default function useDocumentEventListener(
  type: string,
  eventCallback: EventListener,
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
  }, [dependencies]);
}
