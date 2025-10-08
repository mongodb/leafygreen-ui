import { queryFirstFocusableElement } from '@leafygreen-ui/lib';

/**
 * Focuses the appropriate element in a modal according to a11y requirements.
 *
 * This function follows the WAI-ARIA Authoring Practices Guide for modals:
 * 1. If any child element has `autoFocus`, that element receives focus
 * 2. Otherwise, focus the first focusable element within the modal
 * 3. The close button serves as a reliable fallback since it's always present
 *
 * @param modalElement - The modal dialog element
 * @returns The element that receives focus, or null if no focusable element is focused
 */
export const focusModalChildElement = (
  modalElement: HTMLDialogElement,
): HTMLElement | null => {
  // If focus is already within the modal, do nothing
  if (
    document.activeElement instanceof HTMLElement &&
    modalElement.contains(document.activeElement)
  ) {
    return document.activeElement;
  }

  // First, check if any child element has autoFocus
  const autoFocusElement = modalElement.querySelector(
    '[autofocus]',
  ) as HTMLElement;

  if (autoFocusElement) {
    // Don't need to explicitly call `focus` because the browser handles it
    return autoFocusElement;
  }

  // If no autoFocus element, find the first focusable element
  const firstFocusableElement = queryFirstFocusableElement(modalElement);

  if (firstFocusableElement) {
    firstFocusableElement.focus();
    return firstFocusableElement;
  }

  // This should never happen since the close button is always present
  return null;
};
