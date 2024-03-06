import { getByLgId } from '@lg-tools/test-harnesses';

import { LGToggleUtilsReturnType } from './getLGToggleUtils.types';

export const getLGToggleUtils = (
  lgId = 'lg-toggle',
): LGToggleUtilsReturnType => {
  /**
   * Queries the DOM for the element using the `data-lgid` data attribute.
   * Will throw if no element is found.
   */
  const element: HTMLButtonElement = getByLgId(lgId);

  /**
   * Queries the `element` for aria-disabled.
   */
  const isInputDisabled = () => {
    return (
      (element as HTMLButtonElement).getAttribute('aria-disabled') === 'true'
    );
  };

  /**
   * Queries the `element` for aria-checked. Returns 'true' or 'false'
   */
  const inputValue = () => {
    return (element as HTMLButtonElement).getAttribute(
      'aria-checked',
    ) as string;
  };

  return {
    elements: {
      getInput: () => element,
    },
    utils: {
      isDisabled: () => isInputDisabled(),
      inputValue: () => inputValue(),
    },
  };
};
