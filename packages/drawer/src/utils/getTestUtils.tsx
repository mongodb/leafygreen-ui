import { getByLgId } from '@lg-tools/test-harnesses';

import { getTestUtils as getButtonTestUtils } from '@leafygreen-ui/button';

import { LGIDs } from '../Drawer';

import { GetTestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = <T extends HTMLElement = HTMLElement>(
  lgId: string = LGIDs.root,
): GetTestUtilsReturnType<T> => {
  /**
   * Queries the DOM for the element using the `data-lgid` data attribute.
   * Will throw if no element is found.
   */
  const element: T = getByLgId!(lgId);

  /**
   * Returns the button test utils for the close button.
   */
  const getCloseButtonUtils = () =>
    getButtonTestUtils<HTMLButtonElement>(LGIDs.closeButton);

  /**
   * Returns the aria-hidden attribute on the drawer.
   */
  const isDrawerOpen = () => {
    return element.getAttribute('aria-hidden') === 'false';
  };

  return {
    getCloseButtonUtils,
    getDrawer: () => element,
    isOpen: () => isDrawerOpen(),
  };
};
