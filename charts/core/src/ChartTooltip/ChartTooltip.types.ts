import { ReactNode } from 'react';
import { type SeriesName } from '@lg-charts/series-provider';
import { type CallbackDataParams } from 'echarts/types/dist/shared';

/**
 * This is the data type used by `CallbackDataParams` but it's not exported.
 * Reimplementing to narrow down the `data` type to be more specific to our use case.
 */
export type OptionDataValue = string | number | Date;

/**
 * Data can be in array format [x, y] or object format { value: [x, y], itemStyle: {...} }
 * when individual data points have custom styling (e.g., zero values with reduced opacity).
 */
export type SeriesDataItem =
  | Array<OptionDataValue>
  | { value: Array<OptionDataValue>; itemStyle?: Record<string, unknown> };

/**
 * Helper function to extract the data array from either format.
 * ECharts passes data differently depending on whether it's a simple array or an object with itemStyle.
 */
export function getDataArray(
  data: SeriesDataItem | undefined,
): Array<OptionDataValue> | undefined {
  if (!data) return undefined;

  // Check if data is an object with a 'value' property (object format)
  if (
    typeof data === 'object' &&
    !Array.isArray(data) &&
    'value' in data &&
    Array.isArray(data.value)
  ) {
    return data.value;
  }

  // Otherwise, assume it's already an array
  if (Array.isArray(data)) {
    return data;
  }

  return undefined;
}

export const AxisPointerType = {
  None: 'none',
  Line: 'line',
  Shadow: 'shadow',
} as const;

export type AxisPointerType =
  (typeof AxisPointerType)[keyof typeof AxisPointerType];

export interface SeriesInfo {
  name: SeriesName;
  value: OptionDataValue;
}

export interface ChartTooltipProps {
  sort?: (seriesA: SeriesInfo, seriesB: SeriesInfo) => number;
  seriesValueFormatter?: (value: OptionDataValue) => ReactNode;
  seriesNameFormatter?: (name: SeriesName) => ReactNode;
  headerFormatter?: (value: number | string, index: number) => ReactNode;
  /**
   * Specifies the visual indicator (axis pointer) used with the tooltip:
   * - 'line' (default): Shows a vertical dashed line on hover.
   * - 'shadow': Displays a shadow under data points sharing the same x-axis value.
   *   note: this is best suited for category axes; for continuous axes, it will appear as a thin, dim line.
   * - 'none': No line/shadow is shown.
   */
  axisPointer?: AxisPointerType;
  /**
   * Additional CSS class names to apply to the tooltip element.
   * Useful for applying environment-specific styles like dark mode overrides.
   */
  className?: string;
}

export interface CallbackSeriesDataPoint extends CallbackDataParams {
  /**
   * Adding axis info because it's not included in the CallbackDataParams type
   * but is provided in the formatter callback arg because our trigger is 'axis'.
   */
  axisDim: string;
  axisId: string;
  axisIndex: number;
  axisType: string;
  axisValue: string | number;
  axisValueLabel: string | number;
  /**
   * Data can be in array format [x, y] or object format { value: [x, y], itemStyle: {...} }
   * Use getDataArray() helper to extract the array from either format.
   */
  data: SeriesDataItem;
  /**
   * Echarts returns a custom color type which doesn't map to string but is one
   */
  color: string;
}
