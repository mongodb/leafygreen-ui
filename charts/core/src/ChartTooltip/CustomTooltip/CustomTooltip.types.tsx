import { DarkModeProps } from '@leafygreen-ui/lib';

import {
  CallbackSeriesDataPoint,
  ChartTooltipProps,
} from '../ChartTooltip.types';

export interface CustomTooltipProps extends DarkModeProps {
  seriesData: Array<CallbackSeriesDataPoint>;
  sort?: ChartTooltipProps['sort'];
  seriesValueFormatter?: ChartTooltipProps['seriesValueFormatter'];
  seriesNameFormatter?: ChartTooltipProps['seriesNameFormatter'];
  headerFormatter?: ChartTooltipProps['headerFormatter'];
}
