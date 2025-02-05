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

  const getLanguageSwitcherInput = () => {
    const input = queryBySelector<HTMLInputElement>(
      element,
      `[data-lgid=${LGIDs.languageSwitcherInput}]`,
    );

    if (!input) {
      throw new Error('Unable to find language switcher input');
    }

    return input;
  };

  const getLanguageSwitcherOptions = () => {
    const options = queryBySelector<HTMLLIElement>(
      element,
      `[data-lgid=${LGIDs.languageSwitcherOptions}]`,
    );

    if (!options) {
      throw new Error('Unable to find language switcher options');
    }

    return Array.from(options);
  };

  const getLanguageSwitcherOptionByValue = (value: string) => {
    const option = queryBySelector<HTMLLIElement>(
      element,
      `[data-lgid=${LGIDs.languageSwitcherOption}][data-value="${value}"]`,
    );

    if (!option) {
      throw new Error(
        'Unable to find language switcher option with value: ' + value,
      );
    }

    return option;
  };

  const getIsLoading = () => {
    return element.hasAttribute('data-loading');
  };

  const getCopyButton = () => {
    const button = queryBySelector<HTMLButtonElement>(
      element,
      `[data-lgid=${LGIDs.copyButton}]`,
    );

    if (!button) {
      throw new Error('Unable to find copy button');
    }

    return button;
  };

  const getIsExpanded = () => {
    return element.hasAttribute('data-expanded');
  };

  return {
    getLanguage,
    getLanguageSwitcherInput,
    getLanguageSwitcherOptions,
    getLanguageSwitcherOptionByValue,
    getIsLoading,
    getCopyButton,
    getIsExpanded,
  };
};
/**
 * getLanguage
 * getLanguageSwitcherInput
 * getLanguageSwitcherOptions
 * getLanguageSwitcherOptionByValue
 * getIsLoading
 * getCopyButton
 * getIsExpanded
 */
