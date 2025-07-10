export interface GetTestUtilsReturnType<
  T extends HTMLDivElement = HTMLDivElement,
> {
  /**
   * @returns a promise that resolves to the element using the `data-lgid` data attribute.
   * The promise is rejected if no elements match or if more than one match is found.
   */
  findPreviewCard: () => Promise<T>;

  /**
   * @returns the element using the `data-lgid` data attribute.
   * Will throw if no elements match or if more than one match is found.
   */
  getPreviewCard: () => T;

  /**
   * @returns the element using the `data-lgid` data attribute or `null` if no elements match.
   * Will throw if more than one match is found.
   */
  queryPreviewCard: () => T | null;

  /**
   * @returns the content element of the preview card.
   * Will throw if no elements match or if more than one match is found.
   */
  getContent: () => HTMLDivElement;

  /**
   * @returns the toggle element of the preview card.
   * Will throw if no elements match or if more than one match is found.
   */
  getToggle: () => HTMLButtonElement;

  /**
   * @returns whether the preview card is currently expanded.
   */
  isExpanded: () => boolean;
}
