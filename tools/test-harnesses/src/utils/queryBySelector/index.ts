/**
 * @param element HTML element
 * @param query string
 * @returns `Element` | `null`
 */
export const queryBySelector = <T extends Element>(
  element: HTMLElement,
  query: string,
): T | null => {
  return element.querySelector(query);
};
