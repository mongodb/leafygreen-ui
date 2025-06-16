import { Theme } from '@leafygreen-ui/lib';

import { CustomTooltipProps } from '../CustomTooltip.types';

export interface SeriesListProps {
  seriesData: CustomTooltipProps['seriesData'];
  seriesValueFormatter?: CustomTooltipProps['seriesValueFormatter'];
  seriesNameFormatter?: CustomTooltipProps['seriesNameFormatter'];
  sort: CustomTooltipProps['sort'];
  theme: Theme;
  tooltipPinned: CustomTooltipProps['tooltipPinned'];
}
