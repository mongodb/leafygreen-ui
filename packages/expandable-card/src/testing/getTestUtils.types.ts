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
   * @returns the toggle element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  queryToggle: () => HTMLDivElement | null;

  /**
   * @returns the toggle element using the `data-lgid` data attribute.
   */
  findToggle: () => Promise<HTMLDivElement>;

  /**
   * @returns whether the expandable card is currently expanded.
   */
  isExpanded: () => boolean;

  /**
   * @returns the title element of the expandable card.
   */
  getTitle: () => HTMLHeadingElement;

  /**
   * @returns the title element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  queryTitle: () => HTMLHeadingElement | null;

  /**
   * @returns the title element using the `data-lgid` data attribute.
   */
  findTitle: () => Promise<HTMLHeadingElement>;

  /**
   * @returns the description element of the expandable card.
   */
  getDescription: () => HTMLDivElement;

  /**
   * @returns the description element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  queryDescription: () => HTMLDivElement | null;

  /**
   * @returns the description element using the `data-lgid` data attribute.
   */
  findDescription: () => Promise<HTMLDivElement>;

  /**
   * @returns the flag text element of the expandable card.
   */
  getFlagText: () => HTMLSpanElement;

  /**
   * @returns the flag text element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  queryFlagText: () => HTMLSpanElement | null;

  /**
   * @returns the flag text element using the `data-lgid` data attribute.
   */
  findFlagText: () => Promise<HTMLSpanElement>;
}
