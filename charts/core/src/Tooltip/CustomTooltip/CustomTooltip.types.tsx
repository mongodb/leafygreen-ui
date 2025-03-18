import { DarkModeProps } from '@leafygreen-ui/lib';

import { CallbackSeriesDataPoint, TooltipProps } from '../Tooltip.types';

export interface CustomTooltipProps extends DarkModeProps {
  seriesData: Array<CallbackSeriesDataPoint>;
  sortDirection?: 'asc' | 'desc';
  sortKey?: 'name' | 'value';
  seriesValueFormatter?: TooltipProps['seriesValueFormatter'];
  seriesNameFormatter?: TooltipProps['seriesNameFormatter'];
}
