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

  // /**
  //  * Returns the label node and throws an error if no elements match or if more than one match is found.
  //  */
  // getLabel: () => HTMLElement;

  // /**
  //  * Returns the description node and throws an error if no elements match or if more than one match is found.
  //  */
  // getDescription: () => HTMLElement;

  // /**
  //  * Returns the input node and throws an error if no elements match or if more than one match is found.
  //  */
  // getInput: () => HTMLElement;

  // /**
  //  * Returns the error message node and throws an error if no elements match or if more than one match is found.
  //  */
  // getErrorMessage: () => HTMLElement;

  // /**
  //  * Returns the label node and return `null` if no elements match. Throws an error if more than one label node is found.
  //  */
  // queryLabel: () => HTMLElement | null;

  // /**
  //  * Returns the description node and return `null` if no elements match. Throws an error if more than one description node is found.
  //  */
  // queryDescription: () => HTMLElement | null;

  // /**
  //  * Returns the input node and return `null` if no elements match. Throws an error if more than one input node is found.
  //  */
  // queryInput: () => HTMLElement | null;

  // /**
  //  * Returns the error message node and return `null` if no elements match. Throws an error if more than one error message node is found.
  //  */
  // queryErrorMessage: () => HTMLElement | null;

  // /**
  //  * Returns a Promise which resolves the label node. The promise is rejected if no element is found or if more than one element is found after a default timeout of 1000ms
  //  */
  // findLabel: () => Promise<HTMLElement>;

  // /**
  //  * Returns a Promise which resolves the description node. The promise is rejected if no element is found or if more than one element is found after a default timeout of 1000ms
  //  */
  // findDescription: () => Promise<HTMLElement>;

  // /**
  //  * Returns a Promise which resolves the input node. The promise is rejected if no element is found or if more than one element is found after a default timeout of 1000ms
  //  */
  // findInput: () => Promise<HTMLElement>;

  // /**
  //  * Returns a Promise which resolves the error message node. The promise is rejected if no element is found or if more than one element is found after a default timeout of 1000ms
  //  */
  // findErrorMessage: () => Promise<HTMLElement>;
}
