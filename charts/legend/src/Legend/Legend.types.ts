import React from 'react';
import { SeriesName } from '@lg-charts/series-provider';

import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export interface LegendProps
  extends DarkModeProps,
    Omit<HTMLElementProps<'div'>, 'title'> {
  /**
   * An array of series names representing the data series to be displayed in the legend.
   */
  series: Array<SeriesName>;

  /**
   * A function that formats the series name. The function is called with the series name as an argument.
   */
  seriesNameFormatter?: (name: SeriesName) => React.ReactNode;

  /**
   * Determines whether or not to show the select all checkbox.
   * @defaultValue `true`
   */
  showSelectAll?: boolean;
}
