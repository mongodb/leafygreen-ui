export interface GetTestUtilsReturnType<
  T extends HTMLDivElement = HTMLDivElement,
> {
  /**
   * @returns a promise that resolves to the element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  findExpandableCard: () => Promise<T>;

  /**
   * @returns the element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  getExpandableCard: () => T;

  /**
   * @returns the element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  queryExpandableCard: () => T | null;

  /**
   * @returns the toggle element of the expandable card.
   * Will throw if no elements match or if more than one match is found.
   */
  getToggle: () => HTMLDivElement;

  /**
   * @returns whether the expandable card is currently expanded.
   */
  isExpanded: () => boolean;
}
