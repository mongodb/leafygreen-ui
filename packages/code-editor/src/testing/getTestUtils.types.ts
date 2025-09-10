export interface PanelTestUtilsReturnType {
  getPanelElement: () => HTMLElement | null;
  getPanelTitle: () => string | null;
  getFormatButton: () => HTMLElement | null;
  getPanelCopyButton: () => HTMLElement | null;
  getSecondaryMenuButton: () => HTMLElement | null;
  getSecondaryMenu: () => HTMLElement | null;
}

export interface TestUtilsReturnType {
  /**
   * Returns the CodeEditor root element
   */
  getEditor: () => HTMLElement;

  /**
   * Waits for any loading states to complete (both user and internal loading)
   */
  waitForLoadingToComplete: (timeout?: number) => Promise<void>;

  /**
   * Gets the content element from the editor
   */
  getContentElement: () => HTMLElement | null;

  /**
   * Gets the current text content from the editor
   */
  getContent: () => Promise<string | null>;

  /**
   * Types the text into the editor
   */
  typeContent: (text: string) => Promise<void>;

  /**
   * Checks if the editor is currently in a loading state
   */
  getIsLoading: () => boolean;

  /**
   * Checks if the editor is in read-only mode
   */
  getIsReadOnly: () => boolean;

  /**
   * Gets the copy button element (when not using panel)
   */
  getCopyButton: () => HTMLElement | null;

  /**
   * Gets panel-specific test utilities if panel is present
   */
  getPanelUtils: () => PanelTestUtilsReturnType;
}
