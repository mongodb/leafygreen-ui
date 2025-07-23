import type { AxisLabelValueFormatter } from '../Echart/Echart.types';

export const XAxisType = {
  Log: 'log',
  Time: 'time',
  Value: 'value',
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
}
