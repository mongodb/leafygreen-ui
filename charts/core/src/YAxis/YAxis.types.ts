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
   *
   * Formatter of axis label, which supports string template and callback function.
   *
   * ```ts
   * // Use string template; template variable is the default label of axis {value}
   * formatter: '{value} kg'
   *
   * // Use callback.
   * formatter: function (value, index) {
   *   return value + 'kg';
   *}
   * ```
   */
  formatter?: string | ((value: string, index: number) => string);
}
