export interface TestUtilsReturnType {
  /**
   * Returns the number of indicators/dots
   */
  getIndicatorLength: () => number;

  /**
   * Returns the active indicator index
   */
  getActiveIndex: () => number;
}
