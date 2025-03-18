import { DarkModeProps } from '@leafygreen-ui/lib';

import { CallbackSeriesDataPoint, TooltipProps } from '../Tooltip.types';

export interface CustomTooltipProps extends DarkModeProps {
  seriesData: Array<CallbackSeriesDataPoint>;
  sort?: TooltipProps['sort'];
  seriesValueFormatter?: TooltipProps['seriesValueFormatter'];
  seriesNameFormatter?: TooltipProps['seriesNameFormatter'];
}
