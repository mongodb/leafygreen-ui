import type { AxisLabelValueFormatter } from '../Echart/Echart.types';

/**
 * Note: choosing this axis type implicates that the charting library is free to automatically interpolate axis labels and their positions
 * which might not exactly align to each provided data point.
 */
const ContinuousAxisTypes = {
  Log: 'log',
  Time: 'time',
  Value: 'value',
} as const;

type ContinuousAxisTypes =
  (typeof ContinuousAxisTypes)[keyof typeof ContinuousAxisTypes];

const DiscreteAxisTypes = {
  Category: 'category',
} as const;

type DiscreteAxisTypes =
  (typeof DiscreteAxisTypes)[keyof typeof DiscreteAxisTypes];

export const AxisType = {
  ...ContinuousAxisTypes,
  ...DiscreteAxisTypes,
} as const;

export type AxisType = (typeof AxisType)[keyof typeof AxisType];

interface AxisPropsBase {
  /**
   * Label name of the axis.
   */
  label?: string;
  /**
   * Type of the axis.
   */
  type: AxisType;
}

export interface ContinuousAxisProps extends AxisPropsBase {
  type: ContinuousAxisTypes;

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

export interface DiscreteAxisProps extends AxisPropsBase {
  type: DiscreteAxisTypes;

  /**
   * Labels of the data points on the axis.
   */
  labels?: Array<string>;
}

export type AxisProps = ContinuousAxisProps | DiscreteAxisProps;
