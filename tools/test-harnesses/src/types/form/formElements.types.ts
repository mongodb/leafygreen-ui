export interface FormElements<T extends HTMLElement = HTMLInputElement> {
  /**
   * Returns the label node or `null` if the label node is not found.
   */
  getLabel: () => HTMLLabelElement | null;

  /**
   * Returns the description node or `null` if the description node is not found.
   */
  getDescription: () => HTMLElement | null;

  /**
   * Returns the input node.
   */
  getInput: () => T;

  /**
   * Returns the error message node or `null` if the error message node is not found.
   */
  getErrorMessage: () => HTMLElement | null;
}
