import React from 'react';
import { useSeriesContext } from '@lg-charts/series-provider';
import _ from 'lodash';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { EChartSeriesOption } from '../../Echart';
import {
  EChartBarSeriesOption,
  EChartLineSeriesOption,
} from '../../Echart/Echart.types';
import { Series } from '../Series';
import { SeriesProps } from '../Series.types';

export type BarProps = SeriesProps;

const defaultBarOptions: EChartBarSeriesOption = {
  type: 'bar',
  clip: false,
  emphasis: {
    focus: 'self',
  },
};

export function Bar(props: BarProps) {
  const { getColor } = useSeriesContext();
  const { theme } = useDarkMode();
  const color = getColor(props.name, theme);
  const colorOverrides: EChartLineSeriesOption = {
    itemStyle: { color: color || undefined },
  };

  const options: EChartSeriesOption = _.merge(
    {},
    defaultBarOptions,
    props,
    colorOverrides,
  );

  return <Series {...options} />;
}

Bar.displayName = 'Bar';
