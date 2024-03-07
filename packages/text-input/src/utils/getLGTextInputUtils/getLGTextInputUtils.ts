import { getByLgId, getByQuerySelector } from '@lg-tools/test-harnesses';

import { LGTextInputUtilsReturnType } from './getLGTextInputUtils.types';

export const getLGTextInputUtils = (
  lgId = 'lg-text_input',
): LGTextInputUtilsReturnType => {
  /**
   * Queries the DOM for the element using the `data-lgid` data attribute.
   * Will throw if no element is found.
   */
  const element = getByLgId(lgId);

  /**
   * Queries the `element` for the label element. Will return `null` if the label is not found.
   */
  const label = getByQuerySelector<HTMLElement>(
    element,
    '[data-lgid="lg-form_field-label"]',
  );

  /**
   * Queries the `element` for the description element. Will return `null` if the desription is not found.
   */
  const description = getByQuerySelector<HTMLElement>(
    element,
    '[data-lgid="lg-form_field-description"]',
  );

  /**
   * Queries the `element` for the input element.
   */
  const input = getByQuerySelector<HTMLInputElement>(
    element,
    '[data-lgid="lg-text_input-input"]',
  ) as HTMLInputElement;

  /**
   * Queries the `element` for the error message element. Will return `null` if the error message is not found.
   */
  const errorMessage = getByQuerySelector<HTMLElement>(
    element,
    '[data-lgid="lg-form_field-error_message"]',
  );

  /**
   * Queries the `element` for aria-disabled.
   */
  const isInputDisabled = () => {
    const ariaDisabled = getByQuerySelector<HTMLElement>(
      element,
      '[aria-disabled="true"]',
    );

    return !!ariaDisabled;
  };

  const inputValue = () => {
    return input.value;
  };

  /**
   * Queries the `element` for the checkmark Icon.
   */
  const isValid = () => {
    const checkmarkIcon = getByQuerySelector<SVGElement>(
      element,
      'svg[aria-label="Checkmark Icon"]',
    );

    return !!checkmarkIcon;
  };

  /**
   * Queries the `element` for the warning Icon.
   */
  const isError = () => {
    const warningIcon = getByQuerySelector<SVGElement>(
      element,
      'svg[aria-label="Warning Icon"]',
    );

    return !!warningIcon;
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
      isValid: () => isValid(),
      isError: () => isError(),
      inputValue: () => inputValue(),
    },
  };
};
