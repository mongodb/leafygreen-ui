export interface FormElements<T extends HTMLElement = HTMLInputElement> {
  /**
   * Returns the label node.
   */
  getLabel: () => HTMLElement | null;

  /**
   * Returns the description node.
   */
  getDescription: () => HTMLElement | null;

  /**
   * Returns the input node.
   */
  getInput: () => T;

  /**
   * Returns the error message node.
   */
  getErrorMessage: () => HTMLElement | null;
}
