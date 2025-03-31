import { getByLgId, queryBySelector } from '@lg-tools/test-harnesses';

import { getLgIds as getLgTypographyLgIds } from '@leafygreen-ui/typography';

import { DEFAULT_LGID_ROOT, getLgIds } from './getLgIds';
import { CheckboxTestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = (
  lgId: `lg-${string}` = DEFAULT_LGID_ROOT,
): CheckboxTestUtilsReturnType => {
  const lgIds = getLgIds(lgId);
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
  const getInput = queryBySelector<HTMLInputElement>(
    element,
    `input[type="checkbox"]`,
  ) as HTMLInputElement;

  /**
   * Returns the disabled attribute on the input.
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
    return getInput.checked;
  };

  /**
   * Returns whether ot not the input is indeterminate.
   */
  const isInputIndeterminate = () => {
    const ariaDisabled = queryBySelector<HTMLElement>(
      element,
      '[aria-checked="mixed"]',
    );

    return !!ariaDisabled;
  };

  return {
    getLabel: () => getLabel,
    getDescription: () => getDescription,
    getInput: () => getInput,
    isDisabled: () => isInputDisabled(),
    isIndeterminate: () => isInputIndeterminate(),
    getInputValue: () => getInputValue(),
  };
};
