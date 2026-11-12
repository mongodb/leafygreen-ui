import { AxisProps, AxisType } from './Axis.types';

export const XAxisType = AxisType;
type XAxisType = (typeof XAxisType)[keyof typeof XAxisType];

export type XAxisProps = AxisProps & {
  /**
   * Align first and last label with the chart edges, always showing them, and preventing edge labels from being clipped.
   */
  alignEdgeLabels?: boolean;
};
