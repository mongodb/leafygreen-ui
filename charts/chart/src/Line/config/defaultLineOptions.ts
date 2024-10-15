import { SeriesOption } from '../../Chart/Chart.types';

export const defaultLineOptions: Omit<SeriesOption, 'name' | 'data'> = {
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
