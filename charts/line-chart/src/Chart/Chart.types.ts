import { type DarkModeProps, type HTMLElementProps } from '@leafygreen-ui/lib';

export type SeriesOptions = Array<{
  /**
   * Series name used for displaying in tooltip and filtering with the legend.
   */
  name: string;

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
  data: Array<[string | number | Date, string | number | Date]>;
}>;

export interface AxisOptions {
  /**
   * The type of axis to use.
   *
   * 'value': Numerical axis, suitable for continuous data.
   *
   * 'category': Category axis, suitable for discrete category data. Category
   *             data can be auto retrieved from series.data.
   *
   * 'time': Time axis, suitable for continuous time series data. As compared to
   *         value axis, it has a better formatting for time and a different tick
   *         calculation method. For example, it decides to use month, week, day or
   *         hour for tick based on the range of span.
   *
   * 'log': Log axis, suitable for log data. Stacked series with type: 'log' axes may
   *        lead to significant visual errors and may have unintended effects in certain
   *        circumstances. Their use should be avoided.
   */
  type: 'time' | 'value' | 'category' | 'log';

  /**
   * The minimum value of axis.
   *
   * It can be set to a special value 'dataMin' so that the minimum value on this axis is
   * set to be the minimum label.
   *
   * It will be automatically computed to make sure axis tick is equally distributed when not set.
   *
   * In category axis, it can also be set as the ordinal number. For example, if a category
   * axis has data: ['categoryA', 'categoryB', 'categoryC'], and the ordinal 2 represents
   * 'categoryC'. Moreover, it can be set as negative number, like -3.
   *
   * If min is specified as a function, it should return a min value, like:
   *
   * ```
   * min: function (value) {
   *   return value.min - 20;
   * }
   * ```
   *
   * `value` is an object, containing the min value and max value of the data. This function
   * should return the min value of axis, or return null/undefined to use the auto calculated
   * min value.
   */
  min?:
    | number
    | string
    | (({ min, max }: { min: number; max: number }) => number | string);

  /**
   * The maximum value of axis.
   *
   * It can be set to a special value 'dataMax' so that the maximum value on this axis is
   * set to be the maximum label.
   *
   * It will be automatically computed to make sure axis tick is equally distributed when not set.
   *
   * In category axis, it can also be set as the ordinal number. For example, if a category
   * axis has data: ['categoryA', 'categoryB', 'categoryC'], and the ordinal 2 represents
   * 'categoryC'. Moreover, it can be set as negative number, like -3.
   *
   * If min is specified as a function, it should return a min value, like:
   *
   * ```
   * max: function (value) {
   *   return value.max - 20;
   * }
   * ```
   *
   * `value` is an object, containing the min value and max value of the data. This function
   * should return the min value of axis, or return null/undefined to use the auto calculated
   * min value.
   */
  max?:
    | number
    | string
    | (({ min, max }: { min: number; max: number }) => number | string);

  /**
   * String that will be appended to the values of the axis and in the tooltip.
   *
   * This unit will not impact data. E.g. if data is given in dollars and
   * the units are set to “cents”, there will be no conversion of these values.
   * This is strictly presentational. Conversion of data is up to the consumer.
   */
  unit?: string;
}

/**
 * Chart Props
 */
export interface ChartProps extends HTMLElementProps<'div'>, DarkModeProps {
  /**
   * Array of series to be displayed on the chart.
   */
  series: SeriesOptions;

  /**
   * Title of the chart.
   */
  label?: string;

  /**
   * Options for the x-axis.
   */
  xAxis?: AxisOptions;

  /**
   * Options for the y-axis.
   */
  yAxis?: AxisOptions;
}
