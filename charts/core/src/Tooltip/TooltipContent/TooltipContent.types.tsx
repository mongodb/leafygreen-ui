import { ReactNode } from 'react';

import { AxisFormatterCallbackParams } from '../Tooltip.types';

export interface TooltipContentProps {
  params: AxisFormatterCallbackParams;
  sortDirection?: 'asc' | 'desc';
  sortValue?: 'name' | 'value';
  seriesValueFormatter?: (value: string | number | Date) => string | ReactNode;
  seriesNameFormatter?: (seriesName: string) => string | ReactNode;
}
