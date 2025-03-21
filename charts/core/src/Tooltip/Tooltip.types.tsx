import { ReactNode } from 'react';
import { CallbackDataParams } from 'echarts/types/dist/shared';

/**
 * This is the data type used by `CallbackDataParams` but it's not exported.
 * Reimplementing to narrow down the `data` type to be more specific to our use case.
 */
export type OptionDataValue = string | number | Date;

interface SeriesInfo {
  name: OptionDataValue;
  value: OptionDataValue;
}

export interface TooltipProps {
  sort?: (seriesA: SeriesInfo, seriesB: SeriesInfo) => number;
  seriesValueFormatter?: (value: number | string | Date) => ReactNode | string;
  seriesNameFormatter?: (value: number | string | Date) => ReactNode | string;
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
