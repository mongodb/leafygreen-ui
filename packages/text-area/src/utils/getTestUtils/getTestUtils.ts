import { getByLgId, queryBySelector } from '@lg-tools/test-harnesses';

import { getLgIds as getLgFormFieldIds } from '@leafygreen-ui/form-field';
import { getLgIds as getLgTypographyLgIds } from '@leafygreen-ui/typography';

import { DEFAULT_LGID_ROOT, getLgIds } from '../getLgIds';

import { TestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = (
  lgId: `lg-${string}` = DEFAULT_LGID_ROOT,
): TestUtilsReturnType => {
  const lgIds = getLgIds(lgId);
  const lgFormFieldIds = getLgFormFieldIds(lgIds.root);
  const typographyLgIds = getLgTypographyLgIds(lgIds.root);

  /**
   * Queries the DOM for the element using the `data-lgid` data attribute.
   * Will throw if no element is found.
   */
  const element = getByLgId!(lgIds.root);

  /**
   * Queries the `element` for the label element. Will return `null` if the label is not found.
   */
  const getLabel = queryBySelector<HTMLLabelElement>(
    element,
    `[data-lgid=${typographyLgIds.label}]`,
  );

  /**
   * Queries the `element` for the description element. Will return `null` if the desription is not found.
   */
  const getDescription = queryBySelector<HTMLElement>(
    element,
    `[data-lgid=${typographyLgIds.description}]`,
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
    `[data-lgid="${lgFormFieldIds.errorMessage}"]`,
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
