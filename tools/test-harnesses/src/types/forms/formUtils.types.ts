export interface FormUtils {
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
  inputValue: () => string;
}
