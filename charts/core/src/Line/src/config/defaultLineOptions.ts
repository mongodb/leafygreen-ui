import { SeriesOption } from '../../../Chart/src/Chart.types';

export const defaultSeriesOption: Omit<SeriesOption, 'name' | 'data'> = {
  type: 'line',
  showSymbol: false,
  symbol: 'circle',
  clip: false,
  emphasis: {
    disabled: true,
  },
};
