import { ReactNode } from 'react';
import { CallbackDataParams } from 'echarts/types/dist/shared';

interface SeriesInfo {
  name: string | number;
  value: string | number | Date;
}

export interface TooltipProps {
  sort?: (seriesA: SeriesInfo, seriesB: SeriesInfo) => number;
  seriesValueFormatter?: (value: number | string | Date) => ReactNode | string;
  seriesNameFormatter?: (value: number | string | Date) => ReactNode | string;
}

export interface CallbackSeriesDataPoint extends CallbackDataParams {
  axisDim: string;
  axisId: string;
  axisIndex: number;
  axisType: string;
  axisValue: string | number;
  axisValueLabel: string | number;
  /**
   * Narrowing to array because the type of data we accept is always a tuple
   * whereas echarts accepts more
   */
  data: [string | number, string | number | Date];
  /**
   * Echarts returns a custom color type which doesn't map to string but is one
   */
  color: string;
}
