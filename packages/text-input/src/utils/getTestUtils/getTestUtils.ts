import { getByLgId, queryBySelector } from '@lg-tools/test-harnesses';

import { getLgIds as getLGFormFieldIds } from '@leafygreen-ui/form-field';
import { getLgIds as getLGTypographyLgIds } from '@leafygreen-ui/typography';

import { DEFAULT_LGID_ROOT, getLgIds } from '../getLgIds';

import { TestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = (
  lgId: `lg-${string}` = DEFAULT_LGID_ROOT,
): TestUtilsReturnType => {
  const lgIds = getLgIds(lgId);
  const lgFormFieldIds = getLGFormFieldIds(lgIds.root);
  const typographyLgIds = getLGTypographyLgIds(lgIds.root);

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
   * Queries the `element` for the input element.
   */
  const getInput = queryBySelector<HTMLInputElement>(
    element,
    'input',
  ) as HTMLInputElement;

  /**
   * Queries the `element` for the error message element. Will return `null` if the error message is not found.
   */
  const getErrorMessage = queryBySelector<HTMLElement>(
    element,
    `[data-lgid=${lgFormFieldIds.errorMessage}]`,
  );

  /**
   * Queries the `element` for aria-disabled.
   */
  const isInputDisabled = () => {
    const ariaDisabled = queryBySelector<HTMLElement>(
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
    const checkmarkIcon = queryBySelector<SVGElement>(
      element,
      'svg[title="Valid"]',
    );

    return !!checkmarkIcon;
  };

  /**
   * Queries the `element` for the warning Icon.
   */
  const isError = () => {
    const warningIcon = queryBySelector<SVGElement>(
      element,
      'svg[title="Error"]',
    );

    return !!warningIcon;
  };

  /**
   * Queries the `element` for the warning Icon.
   */
  const isOptional = () => {
    const optionalEl = queryBySelector<SVGElement>(
      element,
      `[data-lgid=${lgFormFieldIds.optional}]`,
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
