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

type VoidHandler = () => void;

type OnPoll = VoidHandler;

interface PollerOptions {
  /**
   * How frequently should we call the onPoll handler.
   * @default 5000
   */
  interval?: number;

  /**
   * Should we immediately trigger the onPoll handler.
   * @default true
   */
  immediate?: boolean;
}

interface Poller {
  isPolling: boolean;
  start: VoidHandler;
  stop: VoidHandler;
}

export default function usePoller(
  onPoll: OnPoll,
  { interval = 5e3, immediate = true }: PollerOptions = {},
): Poller {
  const savedCallback = useRef<OnPoll>();
  const [controlledIsPolling, setControlledIsPolling] = useState(true);
  const isVisible = useVisibilityChange();

  const isPolling = isVisible && controlledIsPolling;

  function start() {
    setControlledIsPolling(true);
  }

  function stop() {
    setControlledIsPolling(false);
  }

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

  return {
    isPolling,
    start,
    stop,
  };
}
