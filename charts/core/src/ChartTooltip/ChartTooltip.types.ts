import { ReactNode } from 'react';
import { type SeriesName } from '@lg-charts/series-provider';
import { type CallbackDataParams } from 'echarts/types/dist/shared';

/**
 * This is the data type used by `CallbackDataParams` but it's not exported.
 * Reimplementing to narrow down the `data` type to be more specific to our use case.
 */
export type OptionDataValue = string | number | Date;

export interface SeriesInfo {
  name: SeriesName;
  value: OptionDataValue;
}

export interface ChartTooltipProps {
  sort?: (seriesA: SeriesInfo, seriesB: SeriesInfo) => number;
  seriesValueFormatter?: (value: OptionDataValue) => ReactNode;
  seriesNameFormatter?: (name: SeriesName) => ReactNode;
  headerFormatter?: (value: number | string) => ReactNode;
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
  data: Array<OptionDataValue>;
  /**
   * Echarts returns a custom color type which doesn't map to string but is one
   */
  color: string;
}
