import {
  CallbackSeriesDataPoint,
  OptionDataValue,
} from '../../ChartTooltip.types';
import { SeriesListProps } from '../SeriesList/SeriesList.types';

export interface SeriesListItemProps
  extends Pick<
    SeriesListProps,
    'seriesValueFormatter' | 'seriesNameFormatter'
  > {
  seriesName?: CallbackSeriesDataPoint['seriesName'];
  /** Data array in [x, y] format (already extracted from object format if needed) */
  data: Array<OptionDataValue>;
  color: CallbackSeriesDataPoint['color'];
}
