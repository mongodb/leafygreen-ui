import { useEffect, useRef } from 'react';

/**
 * Hook to subscribe to an event listener.
 * @param type Represents the event type to listen for.
 * @param eventCallback Event listener callback function.
 * @param enabled Determines whether or not the hook should run, defaults to true.
 * @param options Optional parameter to specify options passed to the eventListener.
 * @param dependencies Optional array to be passed to useEffect hook, such that the hook will only run if the array's values have changed.
 * @param element Optional value to be passed as target of event handler. Will default to document.
 */
export default function useDocumentEventListener(
  type: string,
  eventCallback: (e) => void,
  options?: object,
  dependencies?: Array<any>,
  enabled: boolean = true,
  element: Document | HTMLElement = document,
) {
  const memoizedEventCallback = useRef(e => {}); //eslint-disable-line @typescript-eslint/no-unused-vars

  useEffect(() => {
    memoizedEventCallback.current = eventCallback;
  }, [eventCallback]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const callback = e => memoizedEventCallback.current(e);

    element.addEventListener(type, callback, options);

    return () => {
      document.removeEventListener(type, eventCallback);
    };
  }, [
    enabled,
    ...(dependencies ? dependencies : [type, eventCallback, options]),
  ]);
}
