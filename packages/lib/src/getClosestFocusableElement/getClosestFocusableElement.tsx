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

const focusableSelectorString = focusableSelectors.join(', ');

/**
 * Crawls up the DOM tree (using `el.closest`) to find the closest focusable element.
 * Returns the element itself if it is focusable.
 * If no focusable element is found, it returns the body element.
 *
 * This is useful for ensuring that focus is returned to a valid element
 * after an event, such as a click or key press.
 */
export const getClosestFocusableElement = (el: HTMLElement): HTMLElement => {
  const focusableElement = el.closest(
    focusableSelectorString,
  ) as HTMLElement | null;
  return focusableElement ?? document.body;
};
