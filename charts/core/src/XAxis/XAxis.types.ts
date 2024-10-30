export const XAxisType = {
  Category: 'category',
  Value: 'value',
  Time: 'time',
  Log: 'log',
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
   * Unit of the axis to be rendered with value.
   */
  unit?: string;
}
