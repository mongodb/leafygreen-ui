import { getByLgId, queryBySelector } from '@lg-tools/test-harnesses';

import { LGIDs } from '../../constants';

import { TestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = (
  lgId: string = LGIDs.root,
): TestUtilsReturnType => {
  const element = getByLgId!(lgId);

  const getLanguage = () => {
    const language = element.getAttribute('data-language');

    if (!language) {
      throw new Error('Unable to find language');
    }

    return language;
  };

  const getLanguageSwitcher = () => {
    const getInput = () => {
      const input = queryBySelector<HTMLInputElement>(
        element,
        `[data-lgid=${LGIDs.select}] button`,
      );

      return input;
    };

    const getAllOptions = () => {
      const options = element.querySelectorAll<HTMLLIElement>(
        `[data-lgid=${LGIDs.select}] [role="option"]`,
      );

      if (!options) {
        throw new Error('Unable to find language switcher options');
      }

      return Array.from(options);
    };

    const getOptionByValue = (value: string) => {
      if (!value) throw new Error('Value cannot be empty');

      const allOptions = getAllOptions();
      const option = allOptions.find(node => node.textContent === value);

      if (!option) return null;

      return option;
    };

    return {
      getInput: () => getInput(),
      isDisabled: () => getInput()?.getAttribute('aria-disabled') === 'true',
      getAllOptions: () => getAllOptions(),
      getOptionByValue: (value: string) => getOptionByValue(value),
    };
  };

  const getIsLoading = () => {
    return !!queryBySelector<HTMLElement>(
      element,
      `[data-lgid=${LGIDs.skeleton}]`,
    );
  };

  const getCopyButton = () => {
    const getButton = () => {
      const button = queryBySelector<HTMLButtonElement>(
        element,
        `button[data-lgid=${LGIDs.copyButton}]`,
      );

      return button;
    };

    const isDisabled = () =>
      getButton()?.getAttribute('aria-disabled') === 'true';

    return {
      getButton: () => getButton(),
      isDisabled: () => isDisabled(),
    };
  };

  const getExpandButton = () => {
    const getExpandButton = () => {
      const button = queryBySelector<HTMLButtonElement>(
        element,
        `[data-lgid=${LGIDs.expandButton}]`,
      );

      return button;
    };

    const isCollapsed = () =>
      !!getExpandButton()?.textContent?.includes('Click to expand');

    const isExpanded = () =>
      !!getExpandButton()?.textContent?.includes('Click to collapse');

    return {
      getButton: () => getExpandButton(),
      isExpanded: () => isExpanded(),
      isCollapsed: () => isCollapsed(),
    };
  };

  return {
    getLanguage,
    getLanguageSwitcher,
    getIsLoading,
    getCopyButton,
    getExpandButton,
  };
};
