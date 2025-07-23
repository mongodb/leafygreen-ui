export interface FormUtils<T = string> {
  /**
   * Returns whether the input is disabled
   */
  isDisabled: () => boolean;

  /**
   * Returns whether the input state is `valid`
   */
  isValid: () => boolean;

  /**
   * Returns whether the input state is `error`
   */
  isError: () => boolean;

  /**
   * Returns the input value
   */
  getInputValue: () => T;

  /**
   * Returns whether the input is `optional`
   */
  isOptional: () => boolean;
}
