import { ChartOptions } from '../../Chart/Chart.types';

export const defaultLineOptions: Omit<ChartOptions['series'], 'name' | 'data'> =
  {
    type: 'line',
    showSymbol: false,
    symbol: 'circle',
    clip: false,
    emphasis: {
      disabled: true,
    },
    lineStyle: {
      width: 1,
    },
  };
