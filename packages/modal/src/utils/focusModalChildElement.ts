import { RefObject } from 'react';

import { queryFirstFocusableElement } from '@leafygreen-ui/lib';

/**
 * Focuses the appropriate element in a modal according to a11y requirements and user preferences.
 *
 * This function follows the WAI-ARIA Authoring Practices Guide for modals with customization support:
 * 1. If `initialFocus` is provided (selector or ref), that element receives focus
 * 2. If any child element has `autoFocus`, that element receives focus
 * 3. If `initialFocus` is "auto" and no child element has the `autoFocus` attribute, focus the first focusable element within the modal
 * 4. If `initialFocus` is `null`, no automatic focus occurs
 *
 * @param modalElement - The modal dialog element
 * @param initialFocus - Focus target ("auto", selector, ref, or null)
 * @returns The element that receives focus, or null if no focusable element is focused
 */
export const focusModalChildElement = (
  modalElement: HTMLDialogElement,
  initialFocus: 'auto' | string | RefObject<HTMLElement> | null,
): HTMLElement | null => {
  // If explicitly disabled, do nothing. This should rarely be used.
  if (initialFocus === null) {
    return null;
  }

  // Handle explicit initialFocus (string selector or ref)
  if (initialFocus !== 'auto') {
    let targetElement: HTMLElement | null = null;

    if (typeof initialFocus === 'string') {
      targetElement = modalElement.querySelector(initialFocus);
    } else if ('current' in initialFocus) {
      targetElement = initialFocus.current;
    }

    if (targetElement instanceof HTMLElement) {
      targetElement.focus();
      return targetElement;
    }
  }

  // Check if any child element has autoFocus
  const autoFocusElement = modalElement.querySelector(
    '[autofocus]',
  ) as HTMLElement;

  if (autoFocusElement) {
    // Don't need to explicitly call `focus` because the browser handles it
    return autoFocusElement;
  }

  // Otherwise, focus first focusable element
  const firstFocusableElement = queryFirstFocusableElement(modalElement);

  if (firstFocusableElement) {
    firstFocusableElement.focus();
    return firstFocusableElement;
  }

  // This should never happen since the close button is always present
  return null;
};
