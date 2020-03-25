import { useState, useRef, useEffect } from 'react';
import useEventListener from './useEventListener';

function useVisibilityChange() {
  const isVisibilityStateVisible = () => document.visibilityState === 'visible';

  const [isVisible, setIsVisible] = useState(isVisibilityStateVisible);

  useEventListener(
    'visibilitychange',
    () => {
      setIsVisible(isVisibilityStateVisible);
    },
    {
      element: document,
    },
  );

  return isVisible;
}

type OnPoll = () => void;

interface PollerOptions {
  /**
   * How frequently should we call the onPoll handler. Defaults to 30 seconds.
   * @default 30000
   */
  interval?: number;

  /**
   * Should we immediately trigger the onPoll handler.
   * @default true
   */
  immediate?: boolean;

  /**
   * Should we be polling.
   * @default true
   */
  enabled?: boolean;
}

export default function usePoller(
  onPoll: OnPoll,
  { interval = 30e3, immediate = true, enabled = true }: PollerOptions = {},
) {
  const savedCallback = useRef<OnPoll>();
  const isVisible = useVisibilityChange();

  const isPolling = isVisible && enabled;

  useEffect(() => {
    savedCallback.current = onPoll;
  });

  useEffect(() => {
    if (!isPolling) {
      return;
    }

    function poll() {
      savedCallback.current?.();
    }

    if (immediate) {
      poll();
    }

    const id = setInterval(poll, interval);

    return () => clearInterval(id);
  }, [interval, immediate, isPolling]);
}
