import { ReactNode } from 'react';

import { AxisFormatterCallbackParams } from '../../Tooltip.types';

export interface SeriesListProps {
  params: AxisFormatterCallbackParams;
  seriesValueFormatter?: (value: string | number | Date) => string | ReactNode;
  seriesNameFormatter?: (seriesName: string) => string | ReactNode;
  sortDirection?: 'asc' | 'desc';
  sortValue?: 'name' | 'value';
}
