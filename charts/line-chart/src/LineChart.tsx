import React from 'react';
import { Chart, Grid, Line } from '@lg-charts/core';

import { LineChartProps } from './LineChart.types';

export function LineChart({ data, ...rest }: LineChartProps) {
  return (
    <Chart>
      <Grid vertical={false} />
      {data.map(({ name, data }) => (
        <Line name={name} data={data} key={name} />
      ))}
    </Chart>
  );
}

LineChart.displayName = 'LineChart';
