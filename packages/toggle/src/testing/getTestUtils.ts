import { getByLgId } from '@lg-tools/test-harnesses';

import { LGIDS_TOGGLE } from '../../constants';

import { TestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = (
  lgId: string = LGIDS_TOGGLE.root,
): TestUtilsReturnType => {
  /**
   * Queries the DOM for the element using the `data-lgid` data attribute.
   * Will throw if no element is found.
   */
  const element: HTMLButtonElement = getByLgId!(lgId);

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
