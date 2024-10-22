import React from 'react';
import { Chart, Line } from '@lg-charts/core';

import { LineChartProps } from './LineChart.types';

export function LineChart({ data }: LineChartProps) {
  return (
    <Chart>
      {data.map(({ name, data }) => (
        <Line name={name} data={data} />
      ))}
    </Chart>
  );
}

LineChart.displayName = 'LineChart';
