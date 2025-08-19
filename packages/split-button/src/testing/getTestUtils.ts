import { findByLgId, getByLgId, queryByLgId } from '@lg-tools/test-harnesses';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LgIdString } from '@leafygreen-ui/lib';
import { getLgIds as getMenuLgIds } from '@leafygreen-ui/menu';

import { DEFAULT_LGID_ROOT, getLgIds } from '../utils/getLgIds';

import { GetTestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = <T extends HTMLElement = HTMLElement>(
  lgId: LgIdString = DEFAULT_LGID_ROOT,
): GetTestUtilsReturnType<T> => {
  const lgIds = getLgIds(lgId);
  const menuLgIds = getMenuLgIds(lgIds.menu);

  // Root/Wrapper utilities
  const findRoot = () => findByLgId!<T>(lgIds.root);
  const getRoot = () => getByLgId!<T>(lgIds.root);
  const queryRoot = () => queryByLgId!<T>(lgIds.root);

  // Primary button utilities
  const findButton = () => findByLgId!<HTMLButtonElement>(lgIds.button);
  const getButton = () => getByLgId!<HTMLButtonElement>(lgIds.button);
  const queryButton = () => queryByLgId!<HTMLButtonElement>(lgIds.button);

  // Menu trigger utilities
  const findTrigger = () => findByLgId!<HTMLButtonElement>(lgIds.trigger);
  const getTrigger = () => getByLgId!<HTMLButtonElement>(lgIds.trigger);
  const queryTrigger = () => queryByLgId!<HTMLButtonElement>(lgIds.trigger);

  // Menu utilities
  const findMenu = () => findByLgId!<HTMLElement>(menuLgIds.root);
  const getMenu = () => getByLgId!<HTMLElement>(menuLgIds.root);
  const queryMenu = () => queryByLgId!<HTMLElement>(menuLgIds.root);

  // Menu items utilities
  const findMenuItems = async (findAllByRole?: Function) => {
    const menuEl = await findMenu();
    return findAllByRole?.(menuEl, 'menuitem');
  };

  const getMenuItems = (getAllByRole?: Function) => {
    const menuEl = getMenu();
    return getAllByRole?.(menuEl, 'menuitem');
  };

  const queryMenuItems = (queryAllByRole?: Function) => {
    const menuEl = queryMenu();
    if (!menuEl) return [];
    return queryAllByRole?.(menuEl, 'menuitem');
  };

  /**
   * Returns the disabled state of the SplitButton.
   * Checks both the primary button and trigger button disabled states.
   */
  const isDisabled = () => {
    const button = getButton();
    const trigger = getTrigger();

    const buttonDisabled = button.getAttribute('aria-disabled') === 'true';
    const triggerDisabled = trigger.getAttribute('aria-disabled') === 'true';

    return buttonDisabled && triggerDisabled;
  };

  /**
   * Opens the menu by clicking or pressing Enter on the trigger
   */
  const openMenu = async (options: { withKeyboard?: boolean } = {}) => {
    const trigger = getTrigger();

    if (options.withKeyboard) {
      trigger.focus();
      await userEvent.keyboard('{enter}');
    } else {
      await userEvent.click(trigger);
    }

    // Wait for menu to appear
    const menuEl = await findMenu();

    // Manually fire transition events since JSDOM doesn't automatically fire them
    fireEvent.transitionEnd(menuEl);
  };

  /**
   * Closes the menu by pressing Escape or clicking outside
   */
  const closeMenu = async (options: { withKeyboard?: boolean } = {}) => {
    if (options.withKeyboard) {
      await userEvent.keyboard('{escape}');
    } else {
      // Click outside the menu to close it
      await userEvent.click(document.body);
    }

    // Wait for menu to disappear - we'll use a try/catch since the menu might not exist
    try {
      const menuEl = queryMenu();

      if (menuEl) {
        fireEvent.transitionEnd(menuEl);
      }
    } catch {
      // Menu already closed
    }
  };

  return {
    findRoot,
    getRoot,
    queryRoot,
    findButton,
    getButton,
    queryButton,
    findTrigger,
    getTrigger,
    queryTrigger,
    findMenu,
    getMenu,
    queryMenu,
    findMenuItems,
    getMenuItems,
    queryMenuItems,
    isDisabled,
    openMenu,
    closeMenu,
  };
};
