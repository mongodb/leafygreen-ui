import { getByLgId } from '@lg-tools/test-harnesses';

import { TOGGLE_LGID } from '../../constants';

import { LGToggleUtilsReturnType } from './getLGToggleUtils.types';

export const getLGToggleUtils = (
  lgId = TOGGLE_LGID,
): LGToggleUtilsReturnType => {
  /**
   * Queries the DOM for the element using the `data-lgid` data attribute.
   * Will throw if no element is found.
   */
  const element: HTMLButtonElement = getByLgId(lgId);

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
    return element.getAttribute('aria-checked') as string;
  };

  return {
    elements: {
      getInput: () => element,
    },
    utils: {
      isDisabled: () => isInputDisabled(),
      getInputValue: () => getInputValue(),
    },
  };
};
