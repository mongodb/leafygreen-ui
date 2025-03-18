import { CallbackSeriesDataPoint } from '../../Tooltip.types';
import { CustomTooltipProps } from '../CustomTooltip.types';

export interface SeriesListProps {
  seriesData: Array<CallbackSeriesDataPoint>;
  seriesValueFormatter?: CustomTooltipProps['seriesValueFormatter'];
  seriesNameFormatter?: CustomTooltipProps['seriesNameFormatter'];
  sort: CustomTooltipProps['sort'];
}
