import { findByQuerySelector, getByLgId } from '@lg-tools/test-harnesses';

import { LGTextAreaUtilsReturnType } from './getLGTextAreaUtils.types';

export const getLGTextAreaUtils = (
  lgId = 'lg-text_area',
): LGTextAreaUtilsReturnType => {
  /**
   * Queries the DOM for the element using the `data-lgid` data attribute.
   * Will throw if no element is found.
   */
  const element = getByLgId(lgId);

  /**
   * Queries the `element` for the label element. Will return `null` if the label is not found.
   */
  const label = findByQuerySelector<HTMLElement>(
    element,
    '[data-lgid="lg-text_area-label"]',
  );

  /**
   * Queries the `element` for the description element. Will return `null` if the desription is not found.
   */
  const description = findByQuerySelector<HTMLElement>(
    element,
    '[data-lgid="lg-text_area-description"]',
  );

  /**
   * Queries the `element` for the input element. Will return `null` if the input is not found.
   */
  const input = findByQuerySelector<HTMLTextAreaElement>(
    element,
    '[data-lgid="lg-text_area-input"]',
  ) as HTMLTextAreaElement;

  /**
   * Queries the `element` for the error message element. Will return `null` if the error message is not found.
   */
  const errorMessage = findByQuerySelector<HTMLElement>(
    element,
    '[data-lgid="lg-text_area-error_message"]',
  );

  /**
   * Returns the disabled attribute on the input.
   */
  const isInputDisabled = () => {
    return input.disabled;
  };

  /**
   * Returns the input value.
   */
  const inputValue = () => {
    return input.value;
  };

  /**
   * Queries the `element` for `aria-invalid`.
   */
  const isError = () => {
    const ariaInvalid = findByQuerySelector<SVGElement>(
      element,
      'textarea[aria-invalid="true"]',
    );

    return !!ariaInvalid;
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
      isError: () => isError(),
      inputValue: () => inputValue(),
    },
  };
};
