import { getByLgId, queryBySelector } from '@lg-tools/test-harnesses';

import { LGIDs } from '../../constants';

import { TestUtilsReturnType } from './getTestUtils.types';

import { getTestUtils as getSelectTestUtils } from '@leafygreen-ui/select';

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
      getAllOptions: () => testUtils.getOptions(),
      getOptionByValue: (value: string) => testUtils.getOptionByValue(value),
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

  const getExpandButton = () => {
    const getExpandButton = () => {
      const button = queryBySelector<HTMLButtonElement>(
        element,
        `[data-lgid=${LGIDs.expandButton}]`,
      );

      return button;
    };

    const isExpanded = () =>
      !!getExpandButton()?.textContent?.includes('Click to collapse');

    return {
      getButton: () => getExpandButton(),
      isExpanded: () => isExpanded(),
    };
  };

  return {
    getLanguage,
    getTitle,
    getLanguageSwitcherUtils,
    getIsLoading,
    getCopyButton,
    getExpandButton,
  };
};
