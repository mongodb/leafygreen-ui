import { getByLgId, queryByQuerySelector } from '@lg-tools/test-harnesses';

import { LGIDS_FORM_FIELD } from '@leafygreen-ui/form-field';
import { LGIDS_TYPOGRAPHY } from '@leafygreen-ui/typography';

import { LGIDS_TEXT_INPUT } from '../../constants';

import { LGTextInputTestUtilsReturnType } from './getLGTextInputTestUtils.types';

export const getLGTextInputTestUtils = (
  lgId: string = LGIDS_TEXT_INPUT.root,
): LGTextInputTestUtilsReturnType => {
  /**
   * Queries the DOM for the element using the `data-lgid` data attribute.
   * Will throw if no element is found.
   */
  const element = getByLgId(lgId);

  /**
   * Queries the `element` for the label element. Will return `null` if the label is not found.
   */
  const getLabel = queryByQuerySelector<HTMLLabelElement>(
    element,
    `[data-lgid=${LGIDS_TYPOGRAPHY.label}]`,
  );

  /**
   * Queries the `element` for the description element. Will return `null` if the desription is not found.
   */
  const getDescription = queryByQuerySelector<HTMLElement>(
    element,
    `[data-lgid=${LGIDS_TYPOGRAPHY.description}]`,
  );

  /**
   * Queries the `element` for the input element.
   */
  const getInput = queryByQuerySelector<HTMLInputElement>(
    element,
    'input',
  ) as HTMLInputElement;

  /**
   * Queries the `element` for the error message element. Will return `null` if the error message is not found.
   */
  const getErrorMessage = queryByQuerySelector<HTMLElement>(
    element,
    `[data-lgid=${LGIDS_FORM_FIELD.errorMessage}]`,
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
    return getInput.value;
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
      `[data-lgid=${LGIDS_FORM_FIELD.optional}]`,
    );

    return !!optionalEl;
  };

  return {
    getLabel: () => getLabel,
    getDescription: () => getDescription,
    getInput: () => getInput,
    getErrorMessage: () => getErrorMessage,
    isDisabled: () => isInputDisabled(),
    isValid: () => isValid(),
    isError: () => isError(),
    getInputValue: () => getInputValue(),
    isOptional: () => isOptional(),
  };
};
