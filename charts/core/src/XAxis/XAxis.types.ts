import type { AxisLabelValueFormatter } from '../Echart/Echart.types';

export const XAxisType = {
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
type XAxisType = (typeof XAxisType)[keyof typeof XAxisType];

export interface XAxisProps {
  /**
   * Type of axis.
   */
  type: XAxisType;

  /**
   * Label name of the axis.
   */
  label?: string;

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
