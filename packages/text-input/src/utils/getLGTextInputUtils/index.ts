import { getByLgId } from '@lg-tools/test-harnesses';

import { LGTextInputUtilsReturnType } from './types';

export const getLGTextInputUtils = (
  lgId = 'lg-text_input',
): LGTextInputUtilsReturnType => {
  const element = getByLgId(lgId);
  const label = element.querySelector<HTMLElement>(
    '[data-lgid="lg-form_field-description"]',
  );
  const description = element.querySelector<HTMLElement>(
    '[data-lgid="lg-form_field-description"]',
  );
  const input = element.querySelector('input');
  const errorMessage = element.querySelector<HTMLElement>(
    '[data-lgid="lg-form_field-error_message"]',
  );

  // TODO: what happens if there is no input?
  // const isInputDisabled = input?.disabled;

  const isInputDisabled = () => {
    if (!input)
      throw new Error(
        `Unable to find an LG Text Input by: [data-lgid="${lgId}"]`,
      );

    return input.disabled;
  };

  return {
    elements: {
      getLabel: () => label,
      getDescription: () => description,
      getInput: () => input,
      getErrorMessage: () => errorMessage,
    },
    utils: {
      isDisabled: () => isInputDisabled(),
    },
  };
};
