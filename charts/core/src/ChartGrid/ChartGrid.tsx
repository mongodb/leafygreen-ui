import { useEffect } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { color, InteractionState, Variant } from '@leafygreen-ui/tokens';

import { ChartOptions } from '../Chart';
import { useChartContext } from '../ChartContext';

import { ChartGridProps } from './ChartGrid.types';

const unsetGridOptions = {
  splitLine: {
    show: false,
  },
};

export function ChartGrid({
  horizontal = true,
  vertical = true,
}: ChartGridProps) {
  const {
    chart: { ready, updateOptions },
  } = useChartContext();
  const { theme } = useDarkMode();

  useEffect(() => {
    if (!ready) return;

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
    updatedOptions.xAxis = {
      ...getUpdatedLineOptions(!!vertical),
    };
    updatedOptions.yAxis = {
      ...getUpdatedLineOptions(!!horizontal),
    };
    updateOptions(updatedOptions);

    return () => {
      /**
       * Hides the grid lines when the component is unmounted.
       */
      updateOptions({
        xAxis: unsetGridOptions,
        yAxis: unsetGridOptions,
      });
    };
  }, [horizontal, ready, theme, updateOptions, vertical]);

  return null;
}

ChartGrid.displayName = 'ChartGrid';
