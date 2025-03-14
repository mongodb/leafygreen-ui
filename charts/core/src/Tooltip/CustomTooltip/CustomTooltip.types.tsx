import { ReactNode } from 'react';

import { CallbackSeriesDataPoint } from '../Tooltip.types';

export interface CustomTooltipProps {
  seriesData: Array<CallbackSeriesDataPoint>;
  sortDirection?: 'asc' | 'desc';
  sortValue?: 'name' | 'value';
  seriesValueFormatter?: (value: string | number | Date) => string | ReactNode;
  seriesNameFormatter?: (seriesName: string) => string | ReactNode;
}
