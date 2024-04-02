import { getByLgId } from '@lg-tools/test-harnesses';

import { LGIDS_BUTTON } from '../constants';

import { GetTestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = (
  lgId: string = LGIDS_BUTTON.root,
): GetTestUtilsReturnType => {
  /**
   * Queries the DOM for the element using the `data-lgid` data attribute.
   * Will throw if no element is found.
   */
  const element: HTMLButtonElement = getByLgId(lgId);

  /**
   * Returns the disabled attribute on the input.
   */
  const isButtonDisabled = () => {
    return element.getAttribute('aria-disabled') === 'true';
  };

  return {
    getButton: () => element,
    isDisabled: () => isButtonDisabled(),
  };
};
