import { getByLgId } from '@lg-tools/test-harnesses';

import { DEFAULT_LGID_ROOT, getLgIds } from '../getLgIds';

import { TestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = (
  lgId: `lg-${string}` = DEFAULT_LGID_ROOT,
): TestUtilsReturnType => {
  const lgIds = getLgIds(lgId);

  /**
   * Queries the DOM for the element using the `data-lgid` data attribute.
   * Will throw if no element is found.
   */
  const element: HTMLButtonElement = getByLgId!(lgIds.root);

  /**
   * Returns the disabled attribute on the input.
   */
  const isInputDisabled = () => {
    return element.getAttribute('aria-disabled') === 'true';
  };

  /**
   * Returns the value for the aria-checked attribute on the input.
   */
  const getInputValue = () => {
    return element.getAttribute('aria-checked') === 'true';
  };

  return {
    getInput: () => element,
    isDisabled: () => isInputDisabled(),
    getInputValue: () => getInputValue(),
  };
};
