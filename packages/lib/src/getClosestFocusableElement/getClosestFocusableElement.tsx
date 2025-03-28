const focusableSelectors = [
  'a',
  'button',
  'frame',
  'iframe',
  'input:not([type=hidden])',
  'select',
  'textarea',
  '*[tabindex]',
] as const;

/**
 * Crawls up the DOM tree to find the closest focusable element.
 * Returns the element itself if it is focusable.
 * If no focusable element is found, it returns the body element.
 *
 * This is useful for ensuring that focus is returned to a valid element
 * after an event, such as a click or key press.
 */
export const getClosestFocusableElement = (el: HTMLElement): HTMLElement => {
  // check if the element is focusable
  if (el.matches(focusableSelectors.join(','))) {
    return el;
  }

  // check if the element has a parent
  if (el.parentElement) {
    return getClosestFocusableElement(el.parentElement);
  }

  return document.body;
};
