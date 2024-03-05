export interface FormElements {
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
  getInput: () => HTMLInputElement | null;

  /**
   * Returns the error message node.
   */
  getErrorMessage: () => HTMLElement | null;
}
