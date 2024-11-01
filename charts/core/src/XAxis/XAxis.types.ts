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
  formatter?:
    | string
    | ((value: string, index: number) => string)
    | { [key: string]: string };
}
