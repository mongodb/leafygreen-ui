// import { queryByLgId } from '@lg-tools/test-harnesses';
// import { findByLgId } from '@lg-tools/test-harnesses';
import { findByLgId, getByLgId, queryByLgId } from '@lg-tools/test-harnesses';

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
  const findButton = () => findByLgId!<T>(lgIds.root);

  /**
   * @returns the element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  const getButton = () => getByLgId!<T>(lgIds.root);

  /**
   * @returns the element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  const queryButton = () => queryByLgId!<T>(lgIds.root);

  /**
   * Returns the disabled attribute on the input.
   */
  const isDisabled = () => {
    const button = getButton();
    return button.getAttribute('aria-disabled') === 'true';
  };

  return {
    findButton,
    getButton,
    queryButton,
    isDisabled,
  };
};
