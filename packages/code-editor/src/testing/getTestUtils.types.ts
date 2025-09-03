export interface PanelTestUtilsReturnType {
  getPanel: () => HTMLElement;
  getPanelTitle: () => string | null;
  getFormatButton: () => HTMLElement | null;
  getPanelCopyButton: () => HTMLElement | null;
  getSecondaryMenuButton: () => HTMLElement | null;
  getSecondaryMenu: () => HTMLElement | null;
  isSecondaryMenuOpen: () => boolean;
}

export interface TestUtilsReturnType {
  /**
   * Returns the CodeEditor root element
   */
  getEditor: () => HTMLElement;

  /**
   * Gets the current text content from the editor
   */
  getContent: () => string | null;

  /**
   * Gets the programming language currently set on the editor
   */
  getLanguage: () => string | null;

  /**
   * Checks if the editor is currently in a loading state
   */
  getIsLoading: () => boolean;

  /**
   * Checks if the editor is in read-only mode
   */
  getIsReadOnly: () => boolean;

  /**
   * Checks if line numbers are enabled and visible
   */
  getHasLineNumbers: () => boolean;

  /**
   * Checks if line wrapping is enabled
   */
  getHasLineWrapping: () => boolean;

  /**
   * Checks if code folding is enabled
   */
  getHasCodeFolding: () => boolean;

  /**
   * Gets all visible line number elements
   */
  getAllLineNumbers: () => Array<HTMLElement>;

  /**
   * Gets a specific line number element by its line number (1-based)
   */
  getLineNumberByIndex: (lineNumber: number) => HTMLElement | null;

  /**
   * Gets the copy button element (when not using panel)
   */
  getCopyButton: () => HTMLElement | null;

  /**
   * Queries for the panel element (returns null if no panel)
   */
  queryPanel: () => HTMLElement | null;

  /**
   * Gets panel-specific test utilities if panel is present
   */
  getPanelUtils: () => PanelTestUtilsReturnType | null;

  /**
   * Gets all tooltip elements currently visible in the editor
   */
  getTooltips: () => Array<HTMLElement>;

  /**
   * Checks if any tooltips are currently visible
   */
  getHasTooltips: () => boolean;

  /**
   * Gets all hyperlink elements if clickable URLs are enabled
   */
  getHyperlinks: () => Array<HTMLElement>;

  /**
   * Checks if hyperlinks/clickable URLs are enabled
   */
  getHasHyperlinks: () => boolean;
}
