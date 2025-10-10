import { SeriesName } from '@lg-charts/series-provider';

type XValue = string | number | Date | null | undefined;
type YValue = string | number | Date | null | undefined;

export interface SeriesProps {
  /**
   * Series name used for displaying in tooltip and filtering with the legend.
   */
  name: SeriesName;

  /**
   * Stack name for the series. Series with the same stack name are stacked together.
   */
  stack?: string;

  /**
   * Data array of the series. Data is represented by a two-dimensional array where
   * each element is a data point. In a data point array, the first element is the
   * x-axis value and the second element is the y-axis value.
   *
   * ```
   * series: [{
   *   data: [
   *     //  X      Y
   *     [  3.4,   4.5 ],
   *     [  4.2,   2.3 ],
   *     [  10.8,  9.5 ],
   *     [  7.2,   8.8 ]
   *   ]
   * }]
   * ```
   */
  data: Array<[XValue, YValue]>;
}
