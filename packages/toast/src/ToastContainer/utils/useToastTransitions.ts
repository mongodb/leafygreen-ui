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
  handleTransitionExit: () => void;
  handleTransitionEnter: () => void;
}

export function useToastTransitions({
  getShouldExpand,
  exitCallback,
  enterCallback,
}: UseToastTransitionsProps): UseToastTransitionsReturnVal {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTransitionEnter = useMemo(
    () =>
      // When a new toast enters, if we should expand,
      // wait for an empty task queue, then set the expanded state
      // and scroll the container to the bottom
      debounce(() => {
        setTimeout(() => {
          if (getShouldExpand()) {
            enterCallback();
            setIsExpanded(true);
          }
        });
      }, transitionDebounceTime),
    [enterCallback, getShouldExpand],
  );

  /**
   * Callback fired when the <Transition> element exits
   */
  const handleTransitionExit = useMemo(
    () =>
      debounce(() => {
        // When a toast is removed
        // wait for an empty task queue before checking the DOM
        setTimeout(() => {
          exitCallback();
          if (!getShouldExpand()) {
            setIsExpanded(false);
          }
        });
      }, transitionDebounceTime),
    [exitCallback, getShouldExpand],
  );

  return {
    isExpanded,
    handleTransitionExit,
    handleTransitionEnter,
  };
}
