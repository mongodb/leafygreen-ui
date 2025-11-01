import type { AxisLabelValueFormatter } from '../Echart/Echart.types';

export const AxisType = {
  Log: 'log',
  Time: 'time',
  Value: 'value',
  /**
   * The 'category' axis type is suitable for discrete types of data like bar charts,
   * where each label should be aligned directly under its corresponding bar. Without
   * using 'category', the charting library may automatically determine axis label positions,
   * which might not correspond to each bar or data point.
   */
  Category: 'category',
} as const;
type AxisType = (typeof AxisType)[keyof typeof AxisType];

export type AxisProps = {
  /**
   * Label name of the axis.
   */
  label?: string;
} & (
  | {
      /**
       * All continuous axis types (value, log, time).
       */
      type: Exclude<AxisType, 'category'>;

      /**
       *
       * Formatter of axis label, which supports string template and callback function.
       *
       * ```ts
       * formatter: (value, index) => `${value}GB`
       * ```
       */
      formatter?: AxisLabelValueFormatter | string;

      /**
       * Minimum value of the axis.
       */
      min?: number;

      /**
       * Maximum value of the axis.
       */
      max?: number;
    }
  | {
      /**
       * A 'category' axis type is suitable for discrete types of data
       * where ideally all category names should be used as axis labels. Without
       * using 'category', the charting library may automatically determine axis
       * label values and positions, which might not correspond to each data point.
       */
      type: 'category';

      /**
       * Labels of the data points on the axis.
       */
      data?: Array<string>;
    }
);

export type ContinuousAxisProps = Extract<
  AxisProps,
  { type: Extract<AxisType, 'value' | 'log' | 'time'> }
>;
