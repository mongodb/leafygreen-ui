import React from 'react';

import { keyMap } from '@leafygreen-ui/lib';

interface HandleKeyboardNavigation {
  event: KeyboardEvent;
  enabledRefs?: Array<HTMLElement>;
  currentRef?: HTMLElement | null;
  handleRefChange: (element: HTMLElement) => void;
  handleClose: () => void;
  refEl: React.RefObject<HTMLElement>;
}

export const handleKeyboardNavigation = ({
  event,
  enabledRefs,
  currentRef,
  handleRefChange,
  handleClose,
  refEl,
}: HandleKeyboardNavigation) => {
  let refToFocus: HTMLElement;
  const checkRefs = enabledRefs ?? [];

  const currentlyFocusedIndex =
    checkRefs?.indexOf(currentRef!) === -1
      ? 0
      : checkRefs?.indexOf(currentRef!) % checkRefs?.length;

  switch (event.key) {
    case keyMap.ArrowDown:
      event.preventDefault(); // Prevents page scrolling
      refToFocus =
        checkRefs[(checkRefs.indexOf(currentRef!) + 1) % checkRefs?.length];

      handleRefChange(refToFocus);
      break;

    case keyMap.ArrowUp:
      event.preventDefault(); // Prevents page scrolling
      refToFocus =
        checkRefs[
          (currentlyFocusedIndex - 1 + checkRefs.length) % checkRefs.length
        ];
      handleRefChange(refToFocus);
      break;

    case keyMap.Tab:
    case keyMap.Escape:
      handleClose();

      if (refEl.current) {
        refEl.current.focus();
      }
      break;

    default:
      break;
  }
};
