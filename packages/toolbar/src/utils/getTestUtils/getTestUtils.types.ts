interface ToolbarIconButtonUtils {
  getElement: () => HTMLButtonElement | undefined;
  isActive: () => boolean | undefined;
  isDisabled: () => boolean | undefined;
}

export interface TestUtilsReturnType {
  /**
   * Returns a promise that resolves to the element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  findToolbar: () => Promise<HTMLButtonElement>;

  /**
   * Returns the element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  getToolbar: () => HTMLButtonElement;

  /**
   * Returns the element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  queryToolbar: () => HTMLButtonElement | null;

  /**
   * Returns an array of all ToolbarIconButtons
   */
  getAllToolbarIconButtons: () => Array<HTMLButtonElement>;

  /**
   * Returns the ToolbarIconButton based on the label
   */
  getToolbarIconButtonByLabel: (label: string) => ToolbarIconButtonUtils | null;

  /**
   * Returns the first active ToolbarIconButton
   */
  getActiveToolbarIconButton: () => HTMLButtonElement | undefined;
}
