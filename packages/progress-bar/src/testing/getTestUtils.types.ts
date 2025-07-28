export interface GetTestUtilsReturnType<
  T extends HTMLDivElement = HTMLDivElement,
> {
  /** Returns the root element containing the progress bar and all accompanying text. */
  getContainer: () => T;

  /** Returns the progress bar element, which may have role "progressbar" or "meter". */
  getBar: () => T;

  /** Returns the fill of the progress bar element */
  getBarFill: () => T;

  /** Returns the track of the progress bar element */
  getBarTrack: () => T;

  /** Returns the CSS var applied to the width of the progress bar fill element. */
  getBarFillWidthVar: () => string;

  /** Returns the icon element, if present. */
  queryIcon: () => T | null;

  /** Returns the label element, if present. */
  queryLabel: () => T | null;

  /** Returns the description element, if present. */
  queryDescription: () => T | null;

  /** Returns the value text element, if present. */
  queryValueText: () => T | null;
}
