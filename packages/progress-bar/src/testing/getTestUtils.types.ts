export interface GetTestUtilsReturnType<
  T extends HTMLDivElement = HTMLDivElement,
> {
  /** Returns the root element containing the progress bar and all accompanying text. */
  getContainer: () => T;

  /** Returns the element with role 'progressbar', if present. */
  queryLoader: () => T | null;

  /** Returns the element with role 'meter', if present. */
  queryMeter: () => T | null;

  /** Returns the fill element of the progress bar */
  getBarFill: () => T;

  /** Returns the track element of the progress bar */
  getBarTrack: () => T;

  /** Returns the icon element, if present. */
  queryIcon: () => T | null;

  /** Returns the label element, if present. */
  queryLabel: () => T | null;

  /** Returns the description element, if present. */
  queryDescription: () => T | null;

  /** Returns the value text element, if present. */
  queryValueText: () => T | null;
}
