import { findByLgId, getByLgId, queryByLgId } from '@lg-tools/test-harnesses';

import { getTestUtils as getButtonTestUtils } from '@leafygreen-ui/button';

import { DEFAULT_LGID_ROOT, getLgIds } from './getLgIds';
import { GetTestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = <T extends HTMLElement = HTMLElement>(
  lgId: `lg-${string}` = DEFAULT_LGID_ROOT,
): GetTestUtilsReturnType<T> => {
  const lgIds = getLgIds(lgId);

  /**
   * @returns a promise that resolves to the element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  const findDrawer = () => findByLgId!<T>(lgIds.root);

  /**
   * @returns the element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getDrawer = () => getByLgId!<T>(lgIds.root);

  /**
   * @returns the element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryDrawer = () => queryByLgId!<T>(lgIds.root);

  /**
   * Returns the button test utils for the close button.
   */
  const getCloseButtonUtils = () =>
    getButtonTestUtils<HTMLButtonElement>(lgIds.closeButton);

  /**
   * Returns the aria-hidden attribute on the drawer.
   */
  const isOpen = () => {
    const element = getDrawer();

    const isAriaVisible = element.getAttribute('aria-hidden') === 'false';
    const { display, opacity, transform, visibility } =
      window.getComputedStyle(element);

    const isCSSVisible =
      display !== 'none' &&
      opacity === '1' &&
      transform === 'translate3d(0, 0, 0)' &&
      visibility !== 'hidden';

    return isAriaVisible && isCSSVisible;
  };

  return {
    findDrawer,
    getDrawer,
    queryDrawer,
    getCloseButtonUtils,
    isOpen,
  };
};
