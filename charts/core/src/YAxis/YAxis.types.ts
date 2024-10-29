export const YAxisType = {
  Category: 'category',
  Value: 'value',
  Time: 'time',
  Log: 'log',
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
   * Unit of the axis to be rendered with value. Only applies if `type` of `value`.
   */
  unit?: string;
}
