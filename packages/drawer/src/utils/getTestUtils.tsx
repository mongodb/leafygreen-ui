import { getByLgId } from '@lg-tools/test-harnesses';

import { LGIDS_DRAWER } from '../Drawer';

import { GetTestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = <T extends HTMLElement = HTMLElement>(
  lgId: string = LGIDS_DRAWER.root,
): GetTestUtilsReturnType<T> => {
  /**
   * Queries the DOM for the element using the `data-lgid` data attribute.
   * Will throw if no element is found.
   */
  const element: T = getByLgId!(lgId);

  /**
   * Returns the aria-hidden attribute on the drawer.
   */
  const isDrawerOpen = () => {
    return element.getAttribute('aria-hidden') === 'false';
  };

  return {
    getDrawer: () => element,
    isOpen: () => isDrawerOpen(),
  };
};
