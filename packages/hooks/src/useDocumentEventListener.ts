import { useEffect, useRef } from 'react';

interface useDocumentOptions {
  dependencies?: Array<any>,
  enabled: boolean,
  element: Document | HTMLElement
}

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
  obj: useDocumentOptions = {
    dependencies: undefined, 
    enabled: true,
    element: document
  }
) {
  const memoizedEventCallback = useRef(e => {}); //eslint-disable-line @typescript-eslint/no-unused-vars

  useEffect(() => {
    memoizedEventCallback.current = eventCallback;
  }, [eventCallback]);

  useEffect(() => {
    if (!obj.enabled) {
      return;
    }

    const callback = e => memoizedEventCallback.current(e);

    obj.element.addEventListener(type, callback, options);

    return () => {
      document.removeEventListener(type, eventCallback);
    };
  }, [
    obj.enabled,
      ...(obj.dependencies ? obj.dependencies : [type, eventCallback, options]),
  ]);
}
