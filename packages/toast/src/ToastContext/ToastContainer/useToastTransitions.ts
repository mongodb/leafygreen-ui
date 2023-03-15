import { Dispatch, RefObject, SetStateAction, useMemo, useState } from 'react';
import { debounce } from 'lodash';

const transitionDebounceTime = 100;

interface UseToastTransitionsProps {
  shouldExpand: boolean;
  containerRef: RefObject<HTMLDivElement>;
  setHoveredState: Dispatch<SetStateAction<boolean>>;
  totalStackHeight: number;
}

export function useToastTransitions({
  shouldExpand,
  containerRef,
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
        // When a toast is removed, wait for an empty task queue,
        // then check whether the toast container is still hovered
        setImmediate(() => {
          if (containerRef.current) {
            const _isHovered = containerRef.current.matches(':hover');
            setHoveredState(_isHovered);
            if (shouldExpand) {
              setIsExpanded(false);
            }
          }
        });
      }, transitionDebounceTime),
    [containerRef, setHoveredState, shouldExpand],
  );

  const handleTransitionEnter = useMemo(
    () =>
      debounce(() => {
        if (shouldExpand) {
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
    [containerRef, shouldExpand, totalStackHeight],
  );

  return {
    isExpanded,
    handleTransitionExit,
    handleTransitionEnter,
  };
}
