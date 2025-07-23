import { GetTestUtilsReturnType as GetButtonTestUtilsReturnType } from '@leafygreen-ui/button/testing';

export interface GetTestUtilsReturnType<T extends HTMLElement> {
  /**
   * @returns a promise that resolves to the element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  findContextDrawer: () => Promise<T>;

  /**
   * @returns the element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  getContextDrawer: () => T;

  /**
   * @returns the element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  queryContextDrawer: () => T | null;

  /**
   * @returns the button test utils for the toggle button.
   */
  getToggleButtonUtils: () => GetButtonTestUtilsReturnType<HTMLButtonElement>;

  /**
   * @returns whether the drawer is open.
   * Checks the `aria-hidden` attribute and that the drawer element is visible based on CSS
   * properties for `display`, `opacity`, and `visibility`.
   */
  isOpen: () => boolean;
}
