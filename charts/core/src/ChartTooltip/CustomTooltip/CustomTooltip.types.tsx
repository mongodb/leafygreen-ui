import { DarkModeProps } from '@leafygreen-ui/lib';

import {
  CallbackSeriesDataPoint,
  ChartTooltipProps,
} from '../ChartTooltip.types';

export interface CustomTooltipProps extends DarkModeProps {
  chartId: string;
  customRow?: ChartTooltipProps['customRow'];
  headerFormatter?: ChartTooltipProps['headerFormatter'];
  seriesData: Array<CallbackSeriesDataPoint>;
  seriesNameFormatter?: ChartTooltipProps['seriesNameFormatter'];
  seriesValueFormatter?: ChartTooltipProps['seriesValueFormatter'];
  sort?: ChartTooltipProps['sort'];
  tooltipPinned: boolean;
}
