import { useEffect, useRef } from 'react';

interface UseEventOptions {
  options?: object;
  dependencies?: Array<any>;
  enabled?: boolean;
  element?: Document | HTMLElement;
}

/**
 * Hook to subscribe to an event listener.
 * @param type Represents the event type to listen for.
 * @param eventCallback Event listener callback function.
 * @param optional Optional third argument passed to function with implementation specifications
 * @param optional.options Parameter to specify options passed to the eventListener.
 * @param optional.dependencies Array to be passed to useEffect hook, such that the hook will only run if the array's values have changed.
 * @param optional.enabled Determines whether or not the useEffect hook should run.
 * @param optional.element Value to be passed as target of event handler, will default to document.
 */
export default function useEventListener(
  type: string,
  eventCallback: (e) => void,
  {
    options = undefined,
    dependencies = [type, eventCallback],
    enabled = true,
    element = document,
  }: UseEventOptions = {},
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
  }, dependencies);
}
