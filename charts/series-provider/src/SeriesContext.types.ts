import { Theme } from '@leafygreen-ui/lib';

export type SeriesName = string;

export interface SeriesContextType {
  /**
   * Util to get the color of a series by its name and current theme.
   */
  getColor: (name: SeriesName, theme: Theme) => string;

  /**
   * Util to get the index of a series in the `series` prop.
   */
  getSeriesIndex: (name: SeriesName) => number;

  /**
   * Util to check if a series is checked.
   */
  isChecked: (name: SeriesName) => boolean;

  /**
   * Util to check if all series are checked.
   */
  isSelectAllChecked: () => boolean;

  /**
   * Util to check if some, but not all, series are checked.
   */
  isSelectAllIndeterminate: () => boolean;

  /**
   * A callback function to toggle the checked state of a series of a given name.
   */
  toggleSeries: (name: SeriesName) => void;

  /**
   * A callback function to toggle the checked state of all series.
   */
  toggleSelectAll: () => void;
}

export interface SeriesProviderProps {
  /**
   * An optional array of custom colors to be used for the series.
   * If not provided, default colors based on the current theme will be used.
   */
  customColors?: Array<string>;

  /**
   * An array of series names representing the data series to be displayed in descendant charts components.
   */
  series: Array<SeriesName>;
}
