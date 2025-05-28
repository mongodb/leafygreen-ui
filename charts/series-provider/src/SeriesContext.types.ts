import type { DarkColor, LightColor } from '@lg-charts/colors';

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

interface CustomColors {
  [Theme.Dark]: Array<DarkColor>;
  [Theme.Light]: Array<LightColor>;
}

export interface SeriesProviderProps {
  /**
   * An optional object mapping each theme to an array of custom colors for the series.
   * If not provided, default colors based on the current theme will be used.
   */
  customColors?: CustomColors;

  /**
   * An array of series names representing the data series to be displayed in descendant charts components.
   */
  series: Array<SeriesName>;
}
