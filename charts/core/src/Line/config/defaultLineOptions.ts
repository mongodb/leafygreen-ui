import { SeriesOption } from '../../Chart';

export const defaultLineOptions: Omit<SeriesOption, 'name' | 'data'> = {
  type: 'line',
  showSymbol: false,
  symbol: 'circle',
  clip: false,
  symbolSize: 7,
  emphasis: {
    disabled: true,
  },
  lineStyle: {
    width: 1,
  },
};
