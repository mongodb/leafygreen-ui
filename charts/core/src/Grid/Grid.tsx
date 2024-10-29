import { useEffect } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { color, InteractionState, Variant } from '@leafygreen-ui/tokens';

import { ChartOptions } from '../Chart';
import { useChartContext } from '../ChartContext';

import { GridProps } from './Grid.types';

export function Grid({ horizontal = true, vertical = true }: GridProps) {
  const { updateChartOptions } = useChartContext();
  const { theme } = useDarkMode();

  useEffect(() => {
    const updatedOptions: Partial<ChartOptions> = {};
    const getUpdatedLineOptions = (show: boolean) => ({
      splitLine: {
        show: show,
        lineStyle: {
          color:
            color[theme].border[Variant.Secondary][InteractionState.Default],
        },
      },
    });
    updatedOptions.xAxis = getUpdatedLineOptions(!!vertical);
    updatedOptions.yAxis = getUpdatedLineOptions(!!horizontal);
    updateChartOptions(updatedOptions);
  }, [horizontal, vertical, theme]);

  return null;
}

Grid.displayName = 'Grid';
