import { useEffect, useRef, useState } from 'react';

import useEventListener from './useEventListener';

function useVisibilityChange() {
  const isVisibilityStateVisible = () => document.visibilityState === 'visible';

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(isVisibilityStateVisible);
  }, []);

  useEventListener('visibilitychange', () => {
    setIsVisible(isVisibilityStateVisible);
  });

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

    // Using this reflection to get return type of setTimeout so we don't have to
    // use window.setTimeout, makes this more cross-environment compatible
    // Sourced from: https://stackoverflow.com/a/51040768
    let id: ReturnType<typeof setTimeout>;

    function scheduleNextPoll() {
      unscheduleNextPoll();
      id = setTimeout(poll, interval);
    }

    function unscheduleNextPoll() {
      clearTimeout(id);
    }

    function poll() {
      Promise.resolve(savedCallback.current?.()).finally(scheduleNextPoll);
    }

    if (immediate) {
      poll();
    } else {
      scheduleNextPoll();
    }

    return unscheduleNextPoll;
  }, [interval, immediate, isPolling]);
}
