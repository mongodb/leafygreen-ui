import last from 'lodash/last';

const notNegativeTabIndex = ':not([tabindex="-1"])';
const notHidden = ':not([type="hidden"])';
const notDisabled = ':not([disabled])';

/**
 * Selectors for focusable elements in the DOM.
 *
 * Each of these elements can receive tab-focus,
 * and is not hidden or disabled.
 */
const baseFocusableElementSelectors = [
  'button',
  'a',
  'input',
  'select',
  'textarea',
  '[tabindex]',
] as const;
export const focusableElementSelector = baseFocusableElementSelectors
  .map(
    selector => `${selector}${notNegativeTabIndex}${notHidden}${notDisabled}`,
  )
  .join(',');

/**
 * Returns all focusable elements within a given element
 *
 * Focusable elements defined in the constant {@link baseFocusableElementSelectors}
 */
export const queryAllFocusableElements = (
  root: HTMLElement = document.body,
): Array<HTMLElement> => {
  const focusableElements = root.querySelectorAll(focusableElementSelector);
  return Array.from(focusableElements) as Array<HTMLElement>;
};

/**
 * Returns the first focusable element within a given element
 *
 * Focusable elements defined in the constant {@link baseFocusableElementSelectors}
 */
export const queryFirstFocusableElement = (
  root: HTMLElement = document.body,
): HTMLElement | null => {
  const first = root.querySelector(focusableElementSelector);
  return first as HTMLElement;
};

/**
 * Returns the last focusable element within a given element
 *
 * Focusable elements defined in the constant {@link baseFocusableElementSelectors}
 */
export const queryLastFocusableElement = (
  root: HTMLElement = document.body,
): HTMLElement | null => {
  const allElements = queryAllFocusableElements(root);
  return allElements.length ? last(allElements) ?? null : null;
};
