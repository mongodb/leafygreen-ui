export interface TestUtilsReturnType<T extends Element = SVGSVGElement> {
  /**
   * @returns a promise that resolves to the LoadingSpinner element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  findLoadingSpinner: () => Promise<T>;
  /**
   * @returns the LoadingSpinner element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  getLoadingSpinner: () => T;
  /**
   * @returns the LoadingSpinner element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  queryLoadingSpinner: () => T | null;
}
