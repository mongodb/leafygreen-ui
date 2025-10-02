import React from 'react';
import { useSeriesContext } from '@lg-charts/series-provider';
import _ from 'lodash';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { EChartSeriesOption } from '../../Echart';
import { EChartLineSeriesOption } from '../../Echart/Echart.types';
import { Series } from '../Series';
import { SeriesProps } from '../Series.types';

export type LineProps = SeriesProps;

const defaultLineOptions: EChartLineSeriesOption = {
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

export function Line(props: LineProps) {
  const { getColor } = useSeriesContext();
  const { theme } = useDarkMode();
  const color = getColor(props.name, theme);
  const colorOverrides: EChartLineSeriesOption = {
    lineStyle: { color: color || undefined },
    itemStyle: { color: color || undefined },
  };

  const options: EChartSeriesOption = _.merge(
    {},
    defaultLineOptions,
    props,
    colorOverrides,
  );

  return <Series {...options} />;
}

Line.displayName = 'Line';
