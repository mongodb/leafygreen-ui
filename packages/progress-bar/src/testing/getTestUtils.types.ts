export interface GetTestUtilsReturnType<
  T extends HTMLDivElement = HTMLDivElement,
> {
  /** Returns the root element containing the progress bar and all accompanying text. */
  queryContainerElement: () => T | null;

  /** Returns the element with role 'progressbar', if present. */
  queryLoaderElement: () => T | null;

  /** Returns the element with role 'meter', if present. */
  queryMeterElement: () => T | null;

  /** Returns the fill element of the progress bar */
  getBarFillElement: () => T | null;

  /** Returns the track element of the progress bar */
  getBarTrackElement: () => T | null;

  /** Returns the icon element, if present. */
  getIconElement: () => T | null;

  /** Returns the label element, if present. */
  getLabelElement: () => T | null;

  /** Returns the description element, if present. */
  getDescriptionElement: () => T | null;

  /** Returns the value text element, if present. */
  getValueTextElement: () => T | null;
}
