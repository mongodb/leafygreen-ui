import { ReactNode } from 'react';

import { CallbackSeriesDataPoint } from '../../Tooltip.types';

export interface SeriesListProps {
  seriesData: Array<CallbackSeriesDataPoint>;
  seriesValueFormatter?: (value: string | number | Date) => string | ReactNode;
  seriesNameFormatter?: (seriesName: string) => string | ReactNode;
  sortDirection?: 'asc' | 'desc';
  sortValue?: 'name' | 'value';
}
