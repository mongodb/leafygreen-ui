import { useCallback, useEffect, useRef } from 'react';

import { ToastId, ToastStack } from '../ToastContext.types';

/**
 * Sets a timeout when an element is added to the stack.
 * Clears the timeout when the container is hovered.
 * Restores the timers when un-hovered.
 */
export const useToastTimers = ({
  stack,
  isHovered,
  callback,
}: {
  stack: ToastStack;
  isHovered: boolean;
  callback: (id: ToastId) => void;
}) => {
  const timers = useRef<Map<ToastId, NodeJS.Timeout | null>>(new Map());

  const setTimer = useCallback(
    (id: ToastId, timeout?: number | null) => {
      if (timeout && !timers.current.has(id)) {
        const _timerId = setTimeout(() => {
          callback(id);
        }, timeout);
        timers.current.set(id, _timerId);
      }
    },
    [callback],
  );

  function clearAllTimers() {
    timers.current.forEach((timerId, toastId) => {
      if (timerId) clearTimeout(timerId);
      timers.current.delete(toastId);
    });
  }

  // When the stack changes we create a timer
  // and pop the toast when the timer expires
  useEffect(() => {
    stack.forEach(({ timeout }, id) => {
      setTimer(id, timeout);
    });

    return () => clearAllTimers();
  }, [setTimer, stack]);

  useEffect(() => {
    if (isHovered) {
      clearAllTimers();
    } else {
      stack.forEach(({ timeout }, id) => {
        setTimer(id, timeout);
      });
    }

    return () => clearAllTimers();
  }, [isHovered, setTimer, stack]);
};
