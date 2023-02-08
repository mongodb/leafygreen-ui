/**
 * Creates a React SyntheticEvent based on the provided event and target
 */
export const createSyntheticEvent = <T extends Element, E extends Event>(
  event: E,
  target: T,
): React.SyntheticEvent<T, E> => {
  // Assign the target property to the event
  Object.defineProperty(event, 'target', { writable: false, value: target });

  let isDefaultPrevented = false;
  let isPropagationStopped = false;

  const preventDefault = () => {
    isDefaultPrevented = true;
    event.preventDefault();
  };

  const stopPropagation = () => {
    isPropagationStopped = true;
    event.stopPropagation();
  };

  return {
    nativeEvent: event,
    currentTarget: event.currentTarget as EventTarget & T,
    target: event.target as EventTarget & T,
    bubbles: event.bubbles,
    cancelable: event.cancelable,
    defaultPrevented: event.defaultPrevented,
    eventPhase: event.eventPhase,
    isTrusted: event.isTrusted,
    preventDefault,
    isDefaultPrevented: () => isDefaultPrevented,
    stopPropagation,
    isPropagationStopped: () => isPropagationStopped,
    persist: () => {},
    timeStamp: event.timeStamp,
    type: event.type,
  };
};
