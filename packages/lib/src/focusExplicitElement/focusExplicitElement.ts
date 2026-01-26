import { RefObject } from 'react';

/**
 * Focuses an explicit drawer child element.
 * @param drawerElement - The drawer element.
 * @param initialFocus - The initial focus element.
 */
export const focusExplicitElement = (
  element: HTMLElement,
  initialFocus: string | RefObject<HTMLElement>,
) => {
  let targetElement: HTMLElement | null = null;

  if (typeof initialFocus === 'string') {
    targetElement = element.querySelector(initialFocus);
  } else if ('current' in initialFocus) {
    targetElement = initialFocus.current;
  }

  if (targetElement instanceof HTMLElement) {
    targetElement.focus();
    return targetElement;
  }
};
