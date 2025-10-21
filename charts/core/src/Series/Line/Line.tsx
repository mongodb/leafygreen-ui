import React from 'react';

import { EChartSeriesOptions, StylingContext } from '../../Echart/Echart.types';
import { Series } from '../Series';
import { SeriesProps } from '../Series.types';

export type LineProps = SeriesProps;

function getDefaultLineOptions(
  stylingContext: StylingContext,
): EChartSeriesOptions['line']['options'] {
  return {
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
    itemStyle: {
      color: stylingContext.seriesColor,
    },
    lineStyle: {
      color: stylingContext.seriesColor,
      width: 1,
    },
  };
}

export const Line = (props: LineProps) => (
  <Series
    type={'line'}
    name={props.name}
    data={props.data}
    options={getDefaultLineOptions}
  />
);

Line.displayName = 'Line';
