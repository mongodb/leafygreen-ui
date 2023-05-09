import { useCallback, useEffect, useRef } from 'react';

import { ToastId, ToastStack } from '../../ToastContext';

/**
 * Sets a timeout when an element is added to the stack.
 * Clears the timeout when the container is hovered.
 * Restores the timers when un-hovered.
 *
 * @internal
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

  const startTimers = useCallback(
    (stack: ToastStack) => {
      stack.forEach(({ timeout, variant, progress }, id) => {
        // We don't set the timer for `progress` toasts until they're complete
        if (variant !== 'progress' || progress === 1) {
          setTimer(id, timeout);
        }
      });
    },
    [setTimer],
  );

  // When the stack changes we create a timer
  // and pop the toast when the timer expires
  useEffect(() => {
    startTimers(stack);
    return () => clearAllTimers();
  }, [setTimer, stack, startTimers]);

  // When isHovered changes, pause the timers
  useEffect(() => {
    if (isHovered) {
      clearAllTimers();
    } else {
      startTimers(stack);
    }

    return () => clearAllTimers();
  }, [isHovered, setTimer, stack, startTimers]);

  function clearAllTimers() {
    timers.current.forEach((timerId, toastId) => {
      if (timerId) clearTimeout(timerId);
      timers.current.delete(toastId);
    });
  }
};
