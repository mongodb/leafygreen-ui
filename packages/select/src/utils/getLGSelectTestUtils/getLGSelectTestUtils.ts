import { getByLgId, queryByQuerySelector } from '@lg-tools/test-harnesses';

import { LGSelectTestUtilsReturnType } from './getLGSelectTestUtils.types';

export const getLGSelectTestUtils = (
  lgId = 'lg-select',
): LGSelectTestUtilsReturnType => {
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
  const selectTrigger = queryByQuerySelector<HTMLButtonElement>(
    element,
    '[data-lgid="lg-select-trigger"]',
  ) as HTMLButtonElement;

  /**
   * Queries the `element` for the error message element. Will return `null` if the error message is not found.
   */
  const errorMessage = queryByQuerySelector<HTMLElement>(
    element,
    '[data-lgid="lg-select-error_message"]',
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
   * Returns the `Select` value.
   */
  const getSelectValue = () => {
    return selectTrigger.textContent || '';
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

  const getAllOptions = (): Array<HTMLLIElement> => {
    // only one select popover should be open at a time
    const popover = getByLgId('lg-select-popover');

    // Find all options
    const allOptions =
      popover.querySelectorAll<HTMLLIElement>('[role="option"]');

    if (!allOptions.length)
      throw new Error('Could not find any `Select` options.');

    return Array.from(allOptions);
  };

  const getOptionByValue = (value: string): HTMLLIElement => {
    if (!value) throw new Error('Value cannot be empty');

    const allOptions = getAllOptions();

    // Find the option with the value
    const option = allOptions.find(node => node.textContent === value);

    if (!option)
      throw new Error(
        `Could not find Select option with the value '${value}' .`,
      );

    return option;
  };

  const clickOption = (value: string) => {
    if (!value) throw new Error('Value cannot be empty');

    const option = getOptionByValue(value);

    // Click option
    option?.click();
  };

  const clickTrigger = () => {
    selectTrigger.click();
  };

  return {
    elements: {
      getLabel: () => label,
      getDescription: () => description,
      getSelect: () => selectTrigger,
      getErrorMessage: () => errorMessage,
      getOptions: () => getAllOptions(),
      getOptionByValue: (value: string) => getOptionByValue(value),
    },
    utils: {
      isDisabled: () => isInputDisabled(),
      isError: () => isError(),
      getSelectValue: () => getSelectValue(),
      clickOption: (value: string) => clickOption(value),
      clickTrigger: () => clickTrigger(),
    },
  };
};
