export interface TestUtilsReturnType {
  /**
   * Returns the language of the code snippet
   */
  getLanguage: () => string;

  /**
   * Returns the language switcher input
   */
  getLanguageSwitcherInput: () => HTMLInputElement;

  /**
   * Returns the language switcher options
   */
  getLanguageSwitcherOptions: () => Array<HTMLLIElement>;

  /**
   * Returns the language switcher option by value
   */
  getLanguageSwitcherOptionByValue: (value: string) => HTMLLIElement;

  /**
   * Returns whether the code snippet is loading
   */
  getIsLoading: () => boolean;

  /**
   * Returns the copy button
   */
  getCopyButton: () => HTMLButtonElement;

  /**
   * Returns whether the code snippet is expanded
   */
  getIsExpanded: () => boolean;
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
