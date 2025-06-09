import { getByLgId, queryBySelector } from '@lg-tools/test-harnesses';

import { getLgIds as getLgFormFieldIds } from '@leafygreen-ui/form-field';
import { LgIdString } from '@leafygreen-ui/lib';
import { transitionDuration } from '@leafygreen-ui/tokens';
import { getLgIds as getLgTypographyLgIds } from '@leafygreen-ui/typography';

import { DEFAULT_LGID_ROOT, getLgIds } from '../../utils/getLgIds';

import { GetTestUtilsReturnType } from './getTestUtils.types';

export function waitForSelectTransitionDuration() {
  return new Promise(res => setTimeout(res, transitionDuration.slower));
}

const lgFormFieldIds = getLgFormFieldIds();

export const getTestUtils = (
  lgId: LgIdString = DEFAULT_LGID_ROOT,
): GetTestUtilsReturnType => {
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
   * Returns the `Select` value.
   * We have to narrow the container to the text container since `Select`'s without a portal are rendered as children of the `button`.
   */
  const getSelectValue = () => {
    const selectTriggerTextContainer = queryBySelector<HTMLDivElement>(
      getSelectTrigger,
      `[data-lgid=${lgIds.buttonText}]`,
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
      `[data-lgid=${lgIds.popover}]`,
    );

  const getAllOptions = (): Array<HTMLLIElement> => {
    // only one select popover should be open at a time
    const popover = getPopover();

    if (!popover)
      throw new Error(
        `Unable to find an element by: [data-lgid=${lgIds.popover}]`,
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
