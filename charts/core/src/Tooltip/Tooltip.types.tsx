import { CallbackDataParams } from 'echarts/types/dist/shared';

/**
 * Direction tooltip values can be sorted
 */
export const SortDirection = {
  Asc: 'asc',
  Desc: 'desc',
} as const;
export type SortDirection = (typeof SortDirection)[keyof typeof SortDirection];

/**
 * Key by which tooltip values can be sorted
 */
export const SortKey = {
  Name: 'name',
  Value: 'value',
} as const;
export type SortKey = (typeof SortKey)[keyof typeof SortKey];

/**
 * Echart order config types
 */
export const SortOrder = {
  ValueDesc: 'valueDesc',
  ValueAsc: 'valueAsc',
  SeriesDesc: 'seriesDesc',
  SeriesAsc: 'seriesAsc',
} as const;
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

export interface TooltipProps {
  sortDirection?: SortDirection;
  sortKey?: SortKey;
  valueFormatter?: (value: number | string) => string;
}

export type AxisFormatterCallbackParams = Array<
  CallbackDataParams & {
    axisDim: string;
    axisId: string;
    axisIndex: number;
    axisType: string;
    axisValue: string | number;
    axisValueLabel: string | number;
  }
>;
