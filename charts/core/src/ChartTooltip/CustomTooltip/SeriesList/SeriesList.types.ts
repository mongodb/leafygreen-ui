import { Theme } from '@leafygreen-ui/lib';

import { CustomRowInfo } from '../../ChartTooltip.types';
import { CustomTooltipProps } from '../CustomTooltip.types';

export interface SeriesListProps {
  customRowInfo?: CustomRowInfo | null;
  seriesData: CustomTooltipProps['seriesData'];
  seriesValueFormatter?: CustomTooltipProps['seriesValueFormatter'];
  seriesNameFormatter?: CustomTooltipProps['seriesNameFormatter'];
  sort: CustomTooltipProps['sort'];
  theme: Theme;
  tooltipPinned: CustomTooltipProps['tooltipPinned'];
}
