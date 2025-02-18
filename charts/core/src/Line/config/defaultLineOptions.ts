import { SeriesOption } from '../../Chart';

export const defaultLineOptions: Omit<SeriesOption, 'name' | 'data'> = {
  type: 'line',
  showSymbol: false,
  symbol: 'circle',
  clip: false,
  symbolSize: 7,
  emphasis: {
    focus: 'series',
  },
  blur: {
    lineStyle: {
      opacity: 0.5,
    },
  },
  lineStyle: {
    width: 1,
  },
};
