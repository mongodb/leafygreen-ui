import { SeriesListProps } from '../SeriesList/SeriesList.types';

export interface SeriesListItemProps
  extends Pick<
    SeriesListProps,
    'seriesValueFormatter' | 'seriesNameFormatter'
  > {
  seriesName?: string;
  data: [string | number, string | number | Date];
  color: string;
}
