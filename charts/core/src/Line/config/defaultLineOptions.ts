import { SeriesOption } from '../../Chart';

export const defaultLineOptions: Omit<SeriesOption, 'name' | 'data'> = {
  type: 'line',
  showSymbol: false,
  symbol: 'circle',
  clip: false,
  symbolSize: 8,
  emphasis: {
    focus: 'series',
    lineStyle: {
      opacity: 1,
    },
  },
  lineStyle: {
    width: 1,
    type: 'solid',
  },
  blur: {
    lineStyle: {
      opacity: 0.5,
    },
  },
};
