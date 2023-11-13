import React from 'react';

/**
 * Creates a React SyntheticEvent based on the provided native event and target.
 *
 * Based on https://stackoverflow.com/a/68979462/2200383
 */
export const createSyntheticEvent = <
  ReactEventType extends React.SyntheticEvent<TargetType, NativeEventType>,
  TargetType extends Element | EventTarget = Element,
  NativeEventType extends Event = Event,
>(
  event: NativeEventType,
  target: TargetType,
  key?: string,
): ReactEventType => {
  // Assign the target property to the event
  Object.defineProperty(event, 'target', { writable: false, value: target });

  console.log({ key });

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
    currentTarget: event.currentTarget as EventTarget & TargetType,
    target: event.target as EventTarget & TargetType,
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
    key,
  } as unknown as ReactEventType;
};
