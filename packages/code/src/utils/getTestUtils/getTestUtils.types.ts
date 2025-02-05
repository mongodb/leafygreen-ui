export interface TestUtilsReturnType {
  /**
   * Returns the language of the code snippet
   */
  getLanguage: () => string;

  getLanguageSwitcher: () => LanguageSwitcherUtils;

  // /**
  //  * Returns the language switcher input
  //  */
  // getLanguageSwitcherInput: () => HTMLInputElement;

  // /**
  //  * Returns the language switcher options
  //  */
  // getAllLanguageSwitcherOptions: () => Array<HTMLLIElement>;

  // /**
  //  * Returns the language switcher option by value
  //  */
  // getLanguageSwitcherOptionByValue: (value: string) => HTMLLIElement | null;

  /**
   * Returns whether the code snippet is loading
   */
  getIsLoading: () => boolean;

  /**
   * Returns the copy button
   */
  getCopyButton: () => CopyButtonUtils | null;

  /**
   * Returns the expand button
   */
  getExpandButton: () => ExpandedButtonUtils;
}

export interface CopyButtonUtils {
  /**
   * Returns the copy button
   */
  getButton: () => HTMLButtonElement;

  /**
   * Returns whether the copy button is disabled
   */
  isDisabled: () => boolean;
}

export interface LanguageSwitcherUtils {
  /**
   * Returns the language switcher input
   */
  getInput: () => HTMLInputElement;

  /**
   * Returns if the language switcher is disabled
   */
  isDisabled: () => boolean;

  /**
   * Returns the language switcher options
   */
  getAllOptions: () => Array<HTMLLIElement>;

  /**
   * Returns the language switcher option by value
   */
  getOptionByValue: (value: string) => HTMLLIElement | null;
}

export interface ExpandedButtonUtils {
  /**
   * Returns the expand button
   */
  getButton: () => HTMLButtonElement;

  /**
   * Returns whether the code snippet is expanded
   */
  isExpanded: () => boolean;

  /**
   * Returns whether the code snippet is collapsed
   */
  isCollapsed: () => boolean;
}

/**
 * getLanguage
 * getLanguageSwitcherInput
 * getLanguageSwitcherOptions
 * getLanguageSwitcherOptionByValue
 * getIsLoading
 * getCopyButton
 * getIsExpanded
 */
