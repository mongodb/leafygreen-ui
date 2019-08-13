import { useEffect, useRef } from 'react';

interface UseEventOptions {
  options?: AddEventListenerOptions;
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
 * @param optional.enabled Determines whether or not the useEffect hook should run.
 * @param optional.dependencies Array to be passed to useEffect hook, such that the hook will only run if the array's values have changed.
 * @param optional.element Value to be passed as target of event handler, will default to document.
 */
export default function useEventListener<
  Type extends keyof GlobalEventHandlersEventMap
>(
  type: Type,
  eventCallback: (e: GlobalEventHandlersEventMap[Type]) => void,
  {
    options,
    enabled = true,
    dependencies = [enabled, type],
    element = document,
  }: UseEventOptions = {},
) {
  const memoizedEventCallback: React.MutableRefObject<
    (e: GlobalEventHandlersEventMap[Type]) => void
  > = useRef(() => {});

  useEffect(() => {
    memoizedEventCallback.current = eventCallback;
  }, [eventCallback]);

  useEffect(() => {
    const callback = (e: GlobalEventHandlersEventMap[Type]) =>
      memoizedEventCallback.current(e);

    const modifiedEventCallback = (e: any) => {
      if (!enabled) {
        return;
      }

      callback(e);
    };

    // NOTE(JeT): I'm pretty sure there should be a way to avoid this type assertion, but I couldn't figure it out.
    element.addEventListener(
      type,
      modifiedEventCallback as EventListener,
      options,
    );

    return () => {
      element.removeEventListener(
        type,
        modifiedEventCallback as EventListener,
        options,
      );
    };
  }, dependencies);
}
