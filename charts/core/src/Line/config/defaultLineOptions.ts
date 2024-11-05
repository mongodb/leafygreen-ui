import { SeriesOption } from '../../Chart';

export const defaultLineOptions: Omit<SeriesOption, 'name' | 'data'> = {
  type: 'line',
  showSymbol: false,
  symbol: 'circle',
  clip: false,
  symbolSize: 8,
  // emphasis: {
  //   focus: 'series',
  //   // lineStyle: {
  //   //   opacity: 1,
  //   // },
  // },
  lineStyle: {
    width: 1,
    type: 'solid',
  },
  // TODO: (TK) Ask Sooa if she wants to keep this
  // blur: {
  //   lineStyle: {
  //     opacity: 0.5,
  //   },
  // },
};
