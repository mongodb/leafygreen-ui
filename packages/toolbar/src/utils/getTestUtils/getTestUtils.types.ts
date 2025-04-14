interface ToolbarIconButtonUtils {
  element: () => HTMLButtonElement;
  isActive: () => boolean;
  isDisabled: () => boolean;
  // Tooltip? what would it do?
}

export interface TestUtilsReturnType {
  /**
   * Returns the number of indicators/dots
   */
  getAllToolbarIconButtons: () => Array<HTMLButtonElement>;

  /**
   * Returns the active indicator index
   */
  getToolbarIconButtonByIndex: () => ToolbarIconButtonUtils;
}

// TODO: ICONBUTTON test harnesses?
