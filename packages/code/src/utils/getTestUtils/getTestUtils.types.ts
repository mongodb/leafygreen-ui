import { GetTestUtilsReturnType as GetButtonTestUtilsReturnType } from '@leafygreen-ui/button';
import { GetTestUtilsReturnType as GetSelectTestUtilsReturnType } from '@leafygreen-ui/select';

export interface TestUtilsReturnType {
  /**
   * Returns the language of the code snippet
   */
  getLanguage: () => string;

  /**
   * Returns the title of the code snippet
   */
  queryTitle: () => string | null;

  /**
   * Returns the language switcher
   */
  getLanguageSwitcherUtils: () => LanguageSwitcherUtils;

  /**
   * Returns whether the code snippet is loading
   */
  getIsLoading: () => boolean;

  /**
   * Returns the copy button
   */
  getCopyButtonUtils: () => GetButtonTestUtilsReturnType<HTMLButtonElement>;

  /**
   * Returns the expand button
   */
  getExpandButton: GetButtonTestUtilsReturnType<HTMLButtonElement>['getButton'];

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
