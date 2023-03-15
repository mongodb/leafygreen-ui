import { Dispatch, RefObject, SetStateAction, useMemo, useState } from 'react';
import { debounce } from 'lodash';

const transitionDebounceTime = 100;

interface UseToastTransitionsProps {
  containerRef: RefObject<HTMLDivElement>;
  getShouldExpand: () => boolean;
  setHoveredState: Dispatch<SetStateAction<boolean>>;
  totalStackHeight: number;
}

export function useToastTransitions({
  containerRef,
  getShouldExpand,
  setHoveredState,
  totalStackHeight,
}: UseToastTransitionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * Callback fired when the <Transition> element exits
   */
  const handleTransitionExit = useMemo(
    () =>
      debounce(() => {
        // When a toast is removed
        // wait for an empty task queue before checking the DOM
        setImmediate(() => {
          if (containerRef.current) {
            // then check whether the toast container is still hovered
            const _isHovered = containerRef.current.matches(':hover');
            setHoveredState(_isHovered);

            if (!getShouldExpand()) {
              setIsExpanded(false);
            }
          }
        });
      }, transitionDebounceTime),
    [containerRef, getShouldExpand, setHoveredState],
  );

  const handleTransitionEnter = useMemo(
    () =>
      // When a new toast enters, if we should expand,
      // wait for an empty task queue, then set the expanded state
      // and scroll the container to the bottom
      debounce(() => {
        if (getShouldExpand()) {
          setImmediate(() => {
            setIsExpanded(true);
            if (containerRef.current) {
              containerRef.current.scrollTo({
                top: totalStackHeight,
              });
            }
          });
        }
      }, transitionDebounceTime),
    [containerRef, getShouldExpand, totalStackHeight],
  );

  return {
    isExpanded,
    handleTransitionExit,
    handleTransitionEnter,
  };
}
