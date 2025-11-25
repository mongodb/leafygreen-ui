import React, { useState } from 'react';
import type { StoryObj } from '@storybook/react';
import { expect, getByTestId, waitFor } from '@storybook/test';
// because storybook ts files are excluded in the tsconfig to avoid redundant type-definition generation
// @ts-ignore
import { getInstanceByDom } from 'echarts';

import { ChartTooltipProps } from './ChartTooltip/ChartTooltip.types';
import { BarHoverBehavior } from './Series/Bar';
import { Bar } from './Series';
import { makeSeriesData } from './testUtils';
import { Chart, ChartTooltip, XAxis, YAxis } from '.';

const numOfLineColors = 15;
const seriesData = makeSeriesData(numOfLineColors);
const lowDensitySeriesData = seriesData
  .filter((_, i) => i < 3)
  .map(series => ({
    ...series,
    data: series.data.filter((d, i) => i % 4 === 0),
  }));

export default {
  title: 'Composition/Charts/Core/Bar',
  component: Chart,
};

export const _Bar: StoryObj<{}> = {
  render: () => {
    return (
      <Chart>
        <ChartTooltip />
        {lowDensitySeriesData.map(({ name, data }) => (
          <Bar name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const BarStacked: StoryObj<{}> = {
  render: () => {
    return (
      <Chart>
        <ChartTooltip />
        {lowDensitySeriesData.map(({ name, data }, index) => (
          <Bar
            name={name}
            data={data}
            key={name}
            stack={index < 2 ? 'same' : undefined}
          />
        ))}
      </Chart>
    );
  },
};

export const BarWithOnHoverDimOthersBehavior: StoryObj<{
  hoverBehavior: BarHoverBehavior;
}> = {
  args: {
    hoverBehavior: BarHoverBehavior.DimOthers,
  },
  argTypes: {
    hoverBehavior: {
      control: 'select',
      options: [BarHoverBehavior.DimOthers, BarHoverBehavior.None],
      defaultValue: BarHoverBehavior.DimOthers,
    },
  },
  render: ({ hoverBehavior }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ready, setReady] = useState(false);

    return (
      <Chart data-testid="chart-component" onChartReady={() => setReady(true)}>
        {ready && <div data-testid="chart-is-ready" />}
        <ChartTooltip />
        {lowDensitySeriesData.map(({ name, data }) => (
          <Bar
            name={name}
            data={data}
            key={name}
            hoverBehavior={hoverBehavior}
          />
        ))}
      </Chart>
    );
  },
  play: async ({ canvasElement, step }) => {
    const chartContainerElement = getByTestId(canvasElement, 'chart-component');

    const echartsInstance = await waitFor(function getEChartsInstance() {
      expect(getByTestId(canvasElement, 'chart-is-ready')).toBeVisible();

      const instance = getInstanceByDom(chartContainerElement);
      if (!instance) throw new Error('ECharts instance not found');
      return instance;
    });

    await step('Trigger data point hover', () => {
      echartsInstance.dispatchAction(
        {
          type: 'highlight',
          seriesIndex: 1,
          dataIndex: 0,
        },
        {
          flush: true,
        },
      );
    });
  },
};

export const BarWithCustomAxisPointer: StoryObj<{
  axisPointer: ChartTooltipProps['axisPointer'];
}> = {
  args: {
    axisPointer: 'shadow',
  },
  argTypes: {
    axisPointer: {
      control: 'select',
      options: ['line', 'shadow', 'none'],
      defaultValue: 'shadow',
    },
  },
  render: ({ axisPointer }) => {
    return (
      <Chart>
        <XAxis
          type="time"
          formatter={value => {
            const date = new Date(value);
            const minutes = String(date.getUTCMinutes()).padStart(2, '0');
            const seconds = String(date.getUTCSeconds()).padStart(2, '0');
            return `${minutes}:${seconds}`;
          }}
        />
        <YAxis type="value" />
        <ChartTooltip axisPointer={axisPointer} />
        {lowDensitySeriesData.map(({ name, data }) => (
          <Bar name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const BarWithCategoryAxisLabel: StoryObj<{
  axisPointer: ChartTooltipProps['axisPointer'];
}> = {
  args: {
    axisPointer: 'shadow',
  },
  argTypes: {
    axisPointer: {
      control: 'select',
      options: ['line', 'shadow', 'none'],
      defaultValue: 'shadow',
    },
  },
  render: ({ axisPointer }) => {
    const xAxisData = lowDensitySeriesData[0].data.map(([x, _]) =>
      // Format as "mm:ss" instead of slicing the ISO string
      (() => {
        const date = new Date(x as number);
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        return `⏱️ ${minutes}:${seconds}`;
      })(),
    );

    const yAxisData = [
      'Low',
      'Medium-Low',
      'Medium',
      'Medium-High',
      'High',
      'Very High',
      'Extreme',
    ];

    return (
      <Chart>
        <XAxis type="category" labels={xAxisData} />
        <YAxis type="category" labels={yAxisData} />
        <ChartTooltip axisPointer={axisPointer} />
        {lowDensitySeriesData.map(({ name, data }) => (
          <Bar
            key={name}
            name={name}
            data={data.map(([_, value], i) => [
              i,
              (value as number) % yAxisData.length,
            ])}
          />
        ))}
      </Chart>
    );
  },
};
