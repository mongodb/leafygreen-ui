import { CallbackSeriesDataPoint, TooltipProps } from '../Tooltip.types';

export interface CustomTooltipProps {
  seriesData: Array<CallbackSeriesDataPoint>;
  sortDirection?: 'asc' | 'desc';
  sortKey?: 'name' | 'value';
  seriesValueFormatter?: TooltipProps['seriesValueFormatter'];
  seriesNameFormatter?: TooltipProps['seriesNameFormatter'];
}
