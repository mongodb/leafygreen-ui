import { getByLgId, queryBySelector } from '@lg-tools/test-harnesses';

import { getTestUtils as getButtonTestUtils } from '@leafygreen-ui/button';
import { getTestUtils as getSelectTestUtils } from '@leafygreen-ui/select';

import { DEFAULT_LGID_ROOT, getLgIds } from '../getLgIds';

import { TestUtilsReturnType } from './getTestUtils.types';

export const getTestUtils = (
  lgId: `lg-${string}` = DEFAULT_LGID_ROOT,
): TestUtilsReturnType => {
  const lgIds = getLgIds(lgId);

  const element = getByLgId!(lgIds.root);

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
      `[data-lgid=${lgIds.title}]`,
    );

    return title?.textContent || null;
  };

  const getLanguageSwitcherUtils = () => {
    const testUtils = getSelectTestUtils(lgIds.select);

    return {
      getInput: () => testUtils.getInput(),
      isDisabled: () => testUtils.isDisabled(),
      getOptions: () => testUtils.getOptions(),
      getOptionByValue: (value: string) => testUtils.getOptionByValue(value),
      getInputValue: () => testUtils.getInputValue(),
    };
  };

  const getIsLoading = () => {
    return !!queryBySelector<HTMLElement>(
      element,
      `[data-lgid=${lgIds.skeleton}]`,
    );
  };

  const getCopyButtonUtils = () =>
    getButtonTestUtils<HTMLButtonElement>(lgIds.copyButton);

  const getExpandButton = () => {
    const { getButton } = getButtonTestUtils(lgIds.expandButton);
    return getButton() as HTMLButtonElement;
  };

  const getIsExpanded = () => {
    const button = queryBySelector<HTMLButtonElement>(
      element,
      `[data-lgid=${lgIds.expandButton}]`,
    );

    return !!button?.textContent?.includes('Click to collapse');
  };

  return {
    getLanguage,
    getTitle,
    getLanguageSwitcherUtils,
    getIsLoading,
    getCopyButtonUtils,
    getExpandButton,
    getIsExpanded,
  };
};
