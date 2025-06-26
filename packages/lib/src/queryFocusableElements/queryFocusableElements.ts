import last from 'lodash/last';

export const focusableElementSelector =
  'button, a, input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])' as const;

/**
 * Returns all focusable elements within a given element
 *
 * Focusable elements defined in the constant {@link focusableElementSelector}
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
 * Focusable elements defined in the constant {@link focusableElementSelector}
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
 * Focusable elements defined in the constant {@link focusableElementSelector}
 */
export const queryLastFocusableElement = (
  root: HTMLElement = document.body,
): HTMLElement | null => {
  const allElements = queryAllFocusableElements(root);
  return allElements.length ? last(allElements) ?? null : null;
};
