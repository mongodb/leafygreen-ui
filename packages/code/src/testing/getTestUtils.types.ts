import { GetTestUtilsReturnType as GetButtonTestUtilsReturnType } from '@leafygreen-ui/button';
import type { GetTestUtilsReturnType as GetSelectTestUtilsReturnType } from '@leafygreen-ui/select/testing';

export interface TestUtilsReturnType {
  /**
   * Returns the language of the code snippet
   */
  getLanguage: () => string;

  /**
   * Returns the title of the code snippet
   */
  getTitle: () => string | null;

  /**
   * Returns the language switcher
   */
  getLanguageSwitcherUtils: () => LanguageSwitcherUtils;

  /**
   * Returns whether the code snippet is loading
   */
  getIsLoading: () => boolean;

  /**
   * Returns utils for interacting with the copy button
   */
  getCopyButtonUtils: () => GetButtonTestUtilsReturnType<HTMLButtonElement>;

  /**
   * Returns utils for interacting with the expand button
   */
  getExpandButtonUtils: () => Omit<
    GetButtonTestUtilsReturnType<HTMLButtonElement>,
    'isDisabled'
  >;

  /**
   * Returns whether the code snippet is expanded
   */
  getIsExpanded: () => boolean;

  /**
   * Returns the panel
   */
  queryPanel: () => HTMLElement | null;
}

export type LanguageSwitcherUtils = Pick<
  GetSelectTestUtilsReturnType,
  | 'getInput'
  | 'isDisabled'
  | 'getOptions'
  | 'getOptionByValue'
  | 'getInputValue'
>;
