import { CallbackSeriesDataPoint, TooltipProps } from '../Tooltip.types';

export interface CustomTooltipProps {
  seriesData: Array<CallbackSeriesDataPoint>;
  sortDirection?: 'asc' | 'desc';
  sortValue?: 'name' | 'value';
  seriesValueFormatter?: TooltipProps['seriesValueFormatter'];
  seriesNameFormatter?: TooltipProps['seriesNameFormatter'];
}
