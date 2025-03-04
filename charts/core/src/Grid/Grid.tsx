import { useEffect } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { color, InteractionState, Variant } from '@leafygreen-ui/tokens';

import { ChartOptions } from '../Chart';
import { useChartContext } from '../ChartContext';

import { GridProps } from './Grid.types';

const unsetGridOptions = {
  splitLine: {
    show: false,
  },
};

export function Grid({ horizontal = true, vertical = true }: GridProps) {
  const { chart } = useChartContext();
  const { theme } = useDarkMode();

  useEffect(() => {
    if (!chart.ready) return;

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
    chart.updateOptions(updatedOptions);

    return () => {
      /**
       * Hides the grid lines when the component is unmounted.
       */
      chart.updateOptions({
        xAxis: unsetGridOptions,
        yAxis: unsetGridOptions,
      });
    };
    // FIXME:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart.ready, horizontal, vertical, theme]);

  return null;
}

Grid.displayName = 'Grid';
