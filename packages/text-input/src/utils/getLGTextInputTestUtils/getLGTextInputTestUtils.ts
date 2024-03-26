import { getByLgId, queryByQuerySelector } from '@lg-tools/test-harnesses';

import { TEXT_INPUT_LGID } from '../../constants';

import { LGTextInputTestUtilsReturnType } from './getLGTextInputTestUtils.types';

export const getLGTextInputTestUtils = (
  lgId = TEXT_INPUT_LGID,
): LGTextInputTestUtilsReturnType => {
  /**
   * Queries the DOM for the element using the `data-lgid` data attribute.
   * Will throw if no element is found.
   */
  const element = getByLgId(lgId);

  /**
   * Queries the `element` for the label element. Will return `null` if the label is not found.
   */
  const label = queryByQuerySelector<HTMLElement>(
    element,
    '[data-lgid="lg-label"]',
  );

  /**
   * Queries the `element` for the description element. Will return `null` if the desription is not found.
   */
  const description = queryByQuerySelector<HTMLElement>(
    element,
    '[data-lgid="lg-description"]',
  );

  /**
   * Queries the `element` for the input element.
   */
  const input = queryByQuerySelector<HTMLInputElement>(
    element,
    '[data-lgid="lg-text_input-input"]',
  ) as HTMLInputElement;

  /**
   * Queries the `element` for the error message element. Will return `null` if the error message is not found.
   */
  const errorMessage = queryByQuerySelector<HTMLElement>(
    element,
    '[data-lgid="lg-form_field-error_message"]',
  );

  /**
   * Queries the `element` for aria-disabled.
   */
  const isInputDisabled = () => {
    const ariaDisabled = queryByQuerySelector<HTMLElement>(
      element,
      '[aria-disabled="true"]',
    );

    return !!ariaDisabled;
  };

  /**
   * Returns the input value.
   */
  const getInputValue = () => {
    return input.value;
  };

  /**
   * Queries the `element` for the checkmark Icon.
   */
  const isValid = () => {
    const checkmarkIcon = queryByQuerySelector<SVGElement>(
      element,
      'svg[title="Valid"]',
    );

    return !!checkmarkIcon;
  };

  /**
   * Queries the `element` for the warning Icon.
   */
  const isError = () => {
    const warningIcon = queryByQuerySelector<SVGElement>(
      element,
      'svg[title="Error"]',
    );

    return !!warningIcon;
  };

  /**
   * Queries the `element` for the warning Icon.
   */
  const isOptional = () => {
    const optionalEl = queryByQuerySelector<SVGElement>(
      element,
      '[data-lgid="lg-form_field-optional"]',
    );

    return !!optionalEl;
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
      getInputValue: () => getInputValue(),
      isOptional: () => isOptional(),
    },
  };
};
