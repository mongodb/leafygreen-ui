import { getByLgId, queryBySelector } from '@lg-tools/test-harnesses';

import { getTestUtils as getSelectTestUtils } from '@leafygreen-ui/select';

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

  const getTitle = () => {
    const title = queryBySelector<HTMLInputElement>(
      element,
      `[data-lgid=${LGIDs.panel}] p`,
    );

    return title?.textContent || null;
  };

  const getLanguageSwitcherUtils = () => {
    const testUtils = getSelectTestUtils(LGIDs.select);

    return {
      getInput: () => testUtils.getInput(),
      isDisabled: () => testUtils.isDisabled(),
      getOptions: () => testUtils.getOptions(),
      getOptionByValue: (value: string) => testUtils.getOptionByValue(value),
    };
  };

  const getIsLoading = () => {
    return !!queryBySelector<HTMLElement>(
      element,
      `[data-lgid=${LGIDs.skeleton}]`,
    );
  };

  const getCopyButtonUtils = () => {
    const getButton = () => {
      const button = queryBySelector<HTMLButtonElement>(
        element,
        `[data-lgid=${LGIDs.copyButton}]`,
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

  const getExpandButtonUtils = () => {
    const getExpandButtonUtils = () => {
      const button = queryBySelector<HTMLButtonElement>(
        element,
        `[data-lgid=${LGIDs.expandButton}]`,
      );

      return button;
    };

    return {
      getButton: () => getExpandButtonUtils(),
    };
  };

  const getIsExpanded = () => {
    const expandButton = getExpandButtonUtils().getButton();

    return !!expandButton?.textContent?.includes('Click to collapse');
  };

  return {
    getLanguage,
    getTitle,
    getLanguageSwitcherUtils,
    getIsLoading,
    getCopyButtonUtils,
    getExpandButtonUtils,
    getIsExpanded,
  };
};
