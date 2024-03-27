import { getByLgId, queryByQuerySelector } from '@lg-tools/test-harnesses';

import { transitionDuration } from '@leafygreen-ui/tokens';
import { LGIDS_TYPOGRAPHY } from '@leafygreen-ui/typography';

import { LGIDS_SELECT } from '../../constants';

import { LGSelectTestUtilsReturnType } from './getLGSelectTestUtils.types';

export function waitForSelectTransitionDuration() {
  return new Promise(res => setTimeout(res, transitionDuration.slower));
}

export const getLGSelectTestUtils = (
  lgId: string = LGIDS_SELECT.root,
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
    `[data-lgid=${LGIDS_TYPOGRAPHY.label}]`,
  );

  /**
   * Queries the `element` for the description element. Will return `null` if the desription is not found.
   */
  const description = queryByQuerySelector<HTMLElement>(
    element,
    `[data-lgid=${LGIDS_TYPOGRAPHY.description}]`,
  );

  /**
   * Queries the `element` for the input element.
   */
  const selectTrigger = queryByQuerySelector<HTMLButtonElement>(
    element,
    'button',
  ) as HTMLButtonElement;

  /**
   * Queries the `element` for the error message element. Will return `null` if the error message is not found.
   */
  const errorMessage = queryByQuerySelector<HTMLElement>(
    element,
    `[data-lgid=${LGIDS_SELECT.errorMessage}]`,
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

  // We cannot query within the select element because if the popover is using a portal, the element will render outside the select element
  const getPopover = () =>
    queryByQuerySelector<HTMLDivElement>(
      document.body,
      `[data-lgid=${LGIDS_SELECT.popover}]`,
    );

  const getAllOptions = (): Array<HTMLLIElement> => {
    // only one select popover should be open at a time
    const popover = getPopover();

    if (!popover)
      throw new Error(
        `Unable to find an element by: [data-lgid=${LGIDS_SELECT.popover}]`,
      );

    // Find all options
    const allOptions =
      popover.querySelectorAll<HTMLLIElement>('[role="option"]');

    // unlikley to happen since the select will not render without options
    if (!allOptions.length)
      throw new Error('Unable to find any `Select` options.');

    return Array.from(allOptions);
  };

  const getOptionByValue = (value: string) => {
    if (!value) throw new Error('Value cannot be empty');

    const allOptions = getAllOptions();

    // Find the option with the value
    const option = allOptions.find(node => node.textContent === value);

    if (!option) return null;

    return option;
  };

  const clickOption = (value: string) => {
    if (!value) throw new Error('Value cannot be empty');

    const option = getOptionByValue(value);

    if (!option)
      throw new Error(`Unable to find option with the value '${value}'.`);

    // Click option
    option.click();
  };

  const clickTrigger = () => {
    selectTrigger.click();
  };

  return {
    elements: {
      getLabel: () => label,
      getDescription: () => description,
      getInput: () => selectTrigger,
      getErrorMessage: () => errorMessage,
      getOptions: () => getAllOptions(),
      getOptionByValue: (value: string) => getOptionByValue(value),
      getPopover: () => getPopover(),
    },
    utils: {
      isDisabled: () => isInputDisabled(),
      isError: () => isError(),
      getInputValue: () => getSelectValue(),
      clickOption: (value: string) => clickOption(value),
      clickTrigger: () => clickTrigger(),
    },
  };
};
