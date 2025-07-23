import { findByLgId, getByLgId, queryByLgId } from '@lg-tools/test-harnesses';

import { getTestUtils as getButtonTestUtils } from '@leafygreen-ui/button/testing';
import { LgIdString } from '@leafygreen-ui/lib';

import { GetTestUtilsReturnType } from './getTestUtils.types';
import { DEFAULT_LGID_ROOT, getLgIds } from './utils';

export const getTestUtils = <T extends HTMLElement = HTMLElement>(
  lgId: LgIdString = DEFAULT_LGID_ROOT,
): GetTestUtilsReturnType<T> => {
  const lgIds = getLgIds(lgId);

  const findContextDrawer = () => findByLgId!<T>(lgIds.root);
  const getContextDrawer = () => getByLgId!<T>(lgIds.root);
  const queryContextDrawer = () => queryByLgId!<T>(lgIds.root);

  const getToggleButtonUtils = () =>
    getButtonTestUtils<HTMLButtonElement>(lgIds.toggleButton);

  const isOpen = () => {
    const drawer = getContextDrawer();

    const isAriaHidden = drawer.getAttribute('aria-hidden') === 'true';
    const { display, opacity, visibility } = window.getComputedStyle(drawer);
    const isCSSVisible =
      display !== 'none' &&
      opacity !== '0' &&
      visibility !== 'hidden' &&
      visibility !== 'collapse';

    return !isAriaHidden && isCSSVisible;
  };

  return {
    findContextDrawer,
    getContextDrawer,
    queryContextDrawer,
    getToggleButtonUtils,
    isOpen,
  };
};
