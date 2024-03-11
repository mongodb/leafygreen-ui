/**
 * @param element HTML element
 * @param query string
 * @returns `Element` | `null`
 */
export const queryByQuerySelector = <T extends Element>(
  element: HTMLElement,
  query: string,
): T | null => {
  return element.querySelector(query);
};
