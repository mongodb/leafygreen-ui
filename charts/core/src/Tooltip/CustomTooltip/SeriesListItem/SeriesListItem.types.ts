import { CallbackSeriesDataPoint } from '../../Tooltip.types';
import { SeriesListProps } from '../SeriesList/SeriesList.types';

export interface SeriesListItemProps
  extends Pick<
    SeriesListProps,
    'seriesValueFormatter' | 'seriesNameFormatter'
  > {
  seriesName?: CallbackSeriesDataPoint['seriesName'];
  data: CallbackSeriesDataPoint['data'];
  color: CallbackSeriesDataPoint['color'];
}
