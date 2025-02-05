export interface TestUtilsReturnType {
  /**
   * Returns the language of the code snippet
   */
  getLanguage: () => string;

  /**
   * Returns the language switcher
   */
  getLanguageSwitcher: () => LanguageSwitcherUtils;

  /**
   * Returns whether the code snippet is loading
   */
  getIsLoading: () => boolean;

  /**
   * Returns the copy button
   */
  getCopyButton: () => CopyButtonUtils;

  /**
   * Returns the expand button
   */
  getExpandButton: () => ExpandedButtonUtils;
}

export interface CopyButtonUtils {
  /**
   * Returns the copy button
   */
  getButton: () => HTMLButtonElement | null;

  /**
   * Returns whether the copy button is disabled
   */
  isDisabled: () => boolean;
}

export interface LanguageSwitcherUtils {
  /**
   * Returns the language switcher input
   */
  getInput: () => HTMLInputElement | null;

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
  getButton: () => HTMLButtonElement | null;

  /**
   * Returns whether the code snippet is expanded
   */
  isExpanded: () => boolean;
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
