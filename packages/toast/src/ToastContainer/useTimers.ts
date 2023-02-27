import { useCallback, useEffect, useRef } from 'react';

import {
  ToastContextProps,
  ToastId,
  ToastStack,
} from '../ToastContext/ToastContext.types';

/**
 * Sets a timeout when an element is added to the stack.
 * Clears the timeout when the container is hovered.
 * Restores the timers when un-hovered.
 */
export const useTimers = ({
  stack,
  popToast,
  isHovered,
}: {
  stack: ToastStack;
  popToast: ToastContextProps['popToast'];
  isHovered: boolean;
}) => {
  const setTimer = useCallback(
    (id: ToastId, timeout?: number | null) => {
      if (timeout && !timers.current.has(id)) {
        const _timerId = setTimeout(() => popToast(id), timeout);
        timers.current.set(id, _timerId);
      }
    },
    [popToast],
  );

  const timers = useRef<Map<ToastId, NodeJS.Timeout | null>>(new Map());
  useEffect(() => {
    // When the stack changes we create a timer
    // and pop the toast when the timer expires
    stack.forEach(({ timeout }, id) => {
      setTimer(id, timeout);
    });
  }, [popToast, setTimer, stack]);

  useEffect(() => {
    if (isHovered) {
      timers.current.forEach((timerId, toastId) => {
        if (timerId) clearTimeout(timerId);
        timers.current.delete(toastId);
      });
    } else {
      stack.forEach(({ timeout }, id) => {
        setTimer(id, timeout);
      });
    }
  }, [isHovered, setTimer, stack]);
};
