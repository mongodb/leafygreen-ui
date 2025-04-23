import { useEffect } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { color, InteractionState, Variant } from '@leafygreen-ui/tokens';

import { ChartOptions, X_AXIS_ID, Y_AXIS_ID } from '../Chart';
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
  const { chart } = useChartContext();
  const { theme } = useDarkMode();

  const { ready, updateOptions } = chart;

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
      id: X_AXIS_ID,
      ...getUpdatedLineOptions(!!vertical),
    };
    updatedOptions.yAxis = {
      id: Y_AXIS_ID,
      ...getUpdatedLineOptions(!!horizontal),
    };
    updateOptions(updatedOptions, ['xAxis', 'yAxis']);

    return () => {
      /**
       * Hides the grid lines when the component is unmounted.
       */
      updateOptions(
        {
          xAxis: { id: X_AXIS_ID, ...unsetGridOptions },
          yAxis: { id: Y_AXIS_ID, ...unsetGridOptions },
        },
        ['xAxis', 'yAxis'],
      );
    };
  }, [horizontal, ready, theme, updateOptions, vertical]);

  return null;
}

ChartGrid.displayName = 'ChartGrid';
