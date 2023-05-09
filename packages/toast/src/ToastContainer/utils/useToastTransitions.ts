import { useMemo, useState } from 'react';
import { debounce } from 'lodash';

const transitionDebounceTime = 100;

interface UseToastTransitionsProps {
  getShouldExpand: () => boolean;
  /** Callback called once the task queue is empty after the transition has entered */
  enterCallback: () => void;
  /** Callback called once the task queue is empty after the transition has exited */
  exitCallback: () => void;
}

interface UseToastTransitionsReturnVal {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<boolean>;
  handleTransitionExit: () => void;
  handleTransitionEnter: () => void;
}

/**
 * Hook to handle enter and exit transitions.
 * Returns {@link UseToastTransitionsReturnVal}
 *
 * @internal
 */
export function useToastTransitions({
  getShouldExpand,
  exitCallback,
  enterCallback,
}: UseToastTransitionsProps): UseToastTransitionsReturnVal {
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * Callback fired when the <Transition> element enters
   */
  const handleTransitionEnter = useMemo(
    // When a new toast enters, if we should expand,
    // wait for an empty task queue, then set the expanded state
    // and scroll the container to the bottom
    () =>
      debouncedTimeout(() => {
        enterCallback();
        setIsExpanded(getShouldExpand());
      }),
    [enterCallback, getShouldExpand],
  );

  /**
   * Callback fired when the <Transition> element exits
   */
  const handleTransitionExit = useMemo(
    // When a toast is removed
    // wait for an empty task queue before checking the DOM
    () =>
      debouncedTimeout(() => {
        exitCallback();
        setIsExpanded(getShouldExpand());
      }),
    [exitCallback, getShouldExpand],
  );

  return {
    isExpanded,
    setIsExpanded,
    handleTransitionExit,
    handleTransitionEnter,
  };
}

function debouncedTimeout(cb: () => void) {
  return debounce(() => {
    setTimeout(cb);
  }, transitionDebounceTime);
}
