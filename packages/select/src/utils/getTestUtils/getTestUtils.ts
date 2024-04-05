import { getByLgId, queryBySelector } from '@lg-tools/test-harnesses';

import { transitionDuration } from '@leafygreen-ui/tokens';
import { LGIDS_TYPOGRAPHY } from '@leafygreen-ui/typography';

import { LGIDS_SELECT } from '../../constants';

import { TestUtilsReturnType } from './getTestUtils.types';

export function waitForSelectTransitionDuration() {
  return new Promise(res => setTimeout(res, transitionDuration.slower));
}

export const getTestUtils = (
  lgId: string = LGIDS_SELECT.root,
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
   * Queries the `element` for the input element.
   */
  const getSelectTrigger = queryBySelector<HTMLButtonElement>(
    element,
    'button',
  ) as HTMLButtonElement;

  /**
   * Queries the `element` for the error message element. Will return `null` if the error message is not found.
   */
  const getErrorMessage = queryBySelector<HTMLElement>(
    element,
    `[data-lgid=${LGIDS_SELECT.errorMessage}]`,
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
   * Returns the `Select` value.
   * We have to narrow the container to the text container since `Select`'s without a portal are rendered as children of the `button`.
   */
  const getSelectValue = () => {
    const selectTriggerTextContainer = queryBySelector<HTMLDivElement>(
      getSelectTrigger,
      `[data-lgid=${LGIDS_SELECT.buttonText}]`,
    ) as HTMLDivElement;
    return selectTriggerTextContainer.textContent || '';
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

  // We cannot query within the select element because if the popover is using a portal, the element will render outside the select element
  const getPopover = () =>
    queryBySelector<HTMLDivElement>(
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

  return {
    getLabel: () => getLabel,
    getDescription: () => getDescription,
    getInput: () => getSelectTrigger,
    getErrorMessage: () => getErrorMessage,
    getOptions: () => getAllOptions(),
    getOptionByValue: (value: string) => getOptionByValue(value),
    getPopover: () => getPopover(),
    isDisabled: () => isInputDisabled(),
    isError: () => isError(),
    getInputValue: () => getSelectValue(),
  };
};
