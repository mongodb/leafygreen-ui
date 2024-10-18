import React from 'react';
import { Chart, Line } from '@lg-charts/core';

import { TimeSeriesLineChartProps } from './TimeSeriesLineChart.types';

export function TimeSeriesLineChart({ data }: TimeSeriesLineChartProps) {
  return (
    <Chart>
      {data.map(({ name, data }) => (
        <Line name={name} data={data} />
      ))}
    </Chart>
  );
}

TimeSeriesLineChart.displayName = 'TimeSeriesLineChart';
