export interface PanelTestUtilsReturnType<T extends HTMLElement = HTMLElement> {
  /**
   * Returns the panel element
   */
  getPanelElement: () => T | null;
  findPanelElement: () => Promise<T>;
  queryPanelElement: () => T | null;

  /**
   * Returns the format button element
   */
  getFormatButton: () => T | null;
  findFormatButton: () => Promise<T>;
  queryFormatButton: () => T | null;

  /**
   * Returns the panel copy button element
   */
  getPanelCopyButton: () => T | null;
  findPanelCopyButton: () => Promise<T>;
  queryPanelCopyButton: () => T | null;

  /**
   * Returns the secondary menu button element
   */
  getSecondaryMenuButton: () => T | null;
  findSecondaryMenuButton: () => Promise<T>;
  querySecondaryMenuButton: () => T | null;

  /**
   * Returns the secondary menu element
   */
  getSecondaryMenu: () => T | null;
  findSecondaryMenu: () => Promise<T>;
  querySecondaryMenu: () => T | null;
}

export interface GetTestUtilsReturnType<T extends HTMLElement = HTMLElement> {
  /**
   * Returns the CodeEditor root element
   */
  getEditor: () => T | null;
  findEditor: () => Promise<T>;
  queryEditor: () => T | null;

  /**
   * Returns the content container element
   */
  getContentContainer: () => T | null;
  findContentContainer: () => Promise<T>;
  queryContentContainer: () => T | null;

  /**
   * Gets the copy button element (when not using panel)
   */
  getCopyButton: () => T | null;
  findCopyButton: () => Promise<T>;
  queryCopyButton: () => T | null;

  /**
   * Gets panel-specific test utilities if panel is present
   */
  getPanelUtils: () => PanelTestUtilsReturnType;

  /**
   * Waits for any loading states to complete (both user and internal loading)
   */
  waitForLoadingToComplete: (timeout?: number) => Promise<void>;

  /**
   * Checks if the editor is currently in a loading state
   */
  isLoading: () => boolean;
}
