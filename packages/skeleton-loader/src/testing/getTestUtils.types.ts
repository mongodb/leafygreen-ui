export interface TestUtilsReturnType {
  /**
   * @returns a promise that resolves to the SkeletonLoader element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  findSkeletonLoader: () => Promise<HTMLDivElement>;
  /**
   * @returns the SkeletonLoader element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  getSkeletonLoader: () => HTMLDivElement;
  /**
   * @returns the SkeletonLoader element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  querySkeletonLoader: () => HTMLDivElement | null;
}
