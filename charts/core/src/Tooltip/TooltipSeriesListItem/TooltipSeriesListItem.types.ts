import { TooltipSeriesListProps } from '../TooltipSeriesList/TooltipSeriesList.types';

export interface TooltipSeriesListItemProps
  extends Pick<
    TooltipSeriesListProps,
    'seriesValueFormatter' | 'seriesNameFormatter'
  > {
  seriesName?: string;
  data: [string | number, string | number | Date];
  color: string;
}
