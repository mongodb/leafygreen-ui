export interface TestUtilsReturnType {
  /**
   * @returns a promise that resolves to the Spinner element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  findSpinner: () => Promise<SVGSVGElement>;
  /**
   * @returns the Spinner element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  getSpinner: () => SVGSVGElement;
  /**
   * @returns the Spinner element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  querySpinner: () => SVGSVGElement | null;

  /**
   * @returns a promise that resolves to the PageLoader element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  findPageLoader: () => Promise<HTMLDivElement>;
  /**
   * @returns the PageLoader element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  getPageLoader: () => HTMLDivElement;
  /**
   * @returns the PageLoader element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  queryPageLoader: () => HTMLDivElement | null;
}
