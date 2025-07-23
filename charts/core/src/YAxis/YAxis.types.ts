import type { AxisLabelValueFormatter } from '../Echart/Echart.types';

export const YAxisType = {
  Log: 'log',
  Time: 'time',
  Value: 'value',
} as const;

type YAxisType = (typeof YAxisType)[keyof typeof YAxisType];

export interface YAxisProps {
  /**
   * Type of axis.
   */
  type: YAxisType;

  /**
   * Label name to be rendered on the axis.
   */
  label?: string;

  /**
   *
   * Formatter of axis label, which supports string template and callback function.
   *
   * ```ts
   * // Use callback.
   * formatter: function (value, index) {
   *   return value + 'kg';
   *}
   * ```
   */
  formatter?: AxisLabelValueFormatter | string;
}
