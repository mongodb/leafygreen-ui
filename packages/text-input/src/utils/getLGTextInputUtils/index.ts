// @ts-nocheck
import { getByLgId } from '@lg-tools/test-harnesses';

import { LGTextInputUtilsReturnType } from './types';

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
  const label = element.querySelector<HTMLElement>(
    '[data-lgid="lg-form_field-label"]',
  );

  /**
   * Queries the `element` for the description element. Will return `null` if the desription is not found.
   */
  const description = element.querySelector<HTMLElement>(
    '[data-lgid="lg-form_field-description"]',
  );

  /**
   * Queries the `element` for the input element. Will return `null` if the input is not found.
   */
  const input = element.querySelector<HTMLInputElement>('input');

  /**
   * Queries the `element` for the error message element. Will return `null` if the error message is not found.
   */
  const errorMessage = element.querySelector<HTMLElement>(
    '[data-lgid="lg-form_field-error_message"]',
  );

  /**
   * It's very unlinkly that the `input` will not be found since it's always rendered
   */
  const noInputThrow = () => {
    const error = new Error(
      `Unable to find an LG Text Input by: [data-lgid="${lgId}"]`,
    );
    error.name = 'LeafyGreenElementError';
    if (!input) throw error;
  };

  const isInputDisabled = () => {
    noInputThrow();
    return input.disabled;
  };

  const inputValue = () => {
    noInputThrow();
    return input.value;
  };

  const isValid = () => {
    const checkmarkIcon = element.querySelector<SVGElement>(
      'svg[aria-label="Checkmark Icon"]',
    );
    return !!checkmarkIcon;
  };

  const isError = () => {
    const warningIcon = element.querySelector<SVGElement>(
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
