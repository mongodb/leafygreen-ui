export interface SeriesContextType {
  /**
   * A set of id strings representing the data series that should be visible.
   */
  checkedState: Set<string>;

  /**
   * Util to check if a series is checked.
   */
  isChecked: (id: string) => boolean;

  /**
   * Util to check if all series are checked.
   */
  isSelectAllChecked: () => boolean;

  /**
   * Util to check if some, but not all, series are checked.
   */
  isSelectAllIndeterminate: () => boolean;

  /**
   * A callback function to toggle the checked state of a series.
   */
  toggleSeries: (id: string) => void;

  /**
   * A callback function to toggle the checked state of all series.
   */
  toggleSelectAll: () => void;
}

export interface SeriesProviderProps {
  /**
   * An array of id strings representing the data series to be displayed in the legend.
   */
  series: Array<string>;
}
