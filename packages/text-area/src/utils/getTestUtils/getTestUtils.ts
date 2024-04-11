import { getByLgId, queryBySelector } from '@lg-tools/test-harnesses';

import { LGIDS_FORM_FIELD } from '@leafygreen-ui/form-field';
import { LGIDS_TYPOGRAPHY } from '@leafygreen-ui/typography';

import { LGIDS_TEXT_AREA } from '../../constants';

import { TestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = (
  lgId: string = LGIDS_TEXT_AREA.root,
): TestUtilsReturnType => {
  /**
   * Queries the DOM for the element using the `data-lgid` data attribute.
   * Will throw if no element is found.
   */
  const element = getByLgId!(lgId);

  /**
   * Queries the `element` for the label element. Will return `null` if the label is not found.
   */
  const getLabel = queryBySelector<HTMLLabelElement>(
    element,
    `[data-lgid=${LGIDS_TYPOGRAPHY.label}]`,
  );

  /**
   * Queries the `element` for the description element. Will return `null` if the desription is not found.
   */
  const getDescription = queryBySelector<HTMLElement>(
    element,
    `[data-lgid=${LGIDS_TYPOGRAPHY.description}]`,
  );

  /**
   * Queries the `element` for the input element. Will return `null` if the input is not found.
   */
  const getInput = queryBySelector<HTMLTextAreaElement>(
    element,
    `textarea`,
  ) as HTMLTextAreaElement;

  /**
   * Queries the `element` for the error message element. Will return `null` if the error message is not found.
   */
  const getErrorMessage = queryBySelector<HTMLElement>(
    element,
    `[data-lgid="${LGIDS_FORM_FIELD.errorMessage}"]`,
  );

  /**
   * Returns the aria-disabled attribute on the input.
   */
  const isInputAriaDisabled = () => {
    return getInput.getAttribute('aria-disabled') === 'true';
  };

  /**
   * Returns the aria-disabled attribute on the input.
   */
  const isInputReadOnly = () => {
    return getInput.readOnly;
  };

  /**
   * Returns the input value.
   */
  const getInputValue = () => {
    return getInput.value;
  };

  /**
   * Queries the `element` for `aria-invalid`.
   */
  const isError = () => {
    const ariaInvalid = queryBySelector<SVGElement>(
      element,
      'textarea[aria-invalid="true"]',
    );

    return !!ariaInvalid;
  };

  return {
    getLabel: () => getLabel,
    getDescription: () => getDescription,
    getInput: () => getInput,
    getErrorMessage: () => getErrorMessage,
    isDisabled: () => isInputAriaDisabled() && isInputReadOnly(),
    isError: () => isError(),
    getInputValue: () => getInputValue(),
  };
};
