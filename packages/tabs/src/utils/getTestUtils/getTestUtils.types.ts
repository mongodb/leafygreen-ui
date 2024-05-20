export interface TabUtils {
  /**
   * Returns the tab
   */
  getTab: () => HTMLElement;

  /**
   * Returns whether the tab is selected
   */
  isSelected: () => boolean;

  /**
   * Returns whether the tab is disabled
   */
  isDisabled: () => boolean;
}

export interface TestUtilsReturnType {
  /**
   * Returns an array of tabs in the tab list container.
   */
  getAllTabsInTabList: () => Array<HTMLElement>;

  /**
   * Returns tab utils or null if tab is not found
   */
  getTabUtilsByName: (name: string) => TabUtils | null;

  /**
   * Returns selected tab panel or null if a selected tab panel is not found
   */
  getSelectedPanel: () => HTMLElement | null;
}
