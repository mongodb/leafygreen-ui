import React, { useState } from 'react';
import type { StoryObj } from '@storybook/react';
import { expect, getByTestId, waitFor } from '@storybook/test';
// because storybook ts files are excluded in the tsconfig to avoid redundant type-definition generation
// @ts-ignore
import { EChartsOption, getInstanceByDom, SeriesOption } from 'echarts';

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

    await waitFor(function WaitForSeries() {
      const option = echartsInstance.getOption() as EChartsOption;
      const series = (option.series as Array<SeriesOption>) || [];
      expect(series.length).toBe(lowDensitySeriesData.length);
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

export const BarWithMinimumHeight: StoryObj<{
  barMinHeight: number;
}> = {
  args: {
    barMinHeight: 1,
  },
  argTypes: {
    barMinHeight: {
      control: { type: 'number', min: 0, max: 10, step: 1 },
      description: 'Minimum height of bars in pixels',
    },
  },
  render: ({ barMinHeight }) => {
    // Create data with extreme value differences to demonstrate the feature
    const extremeValueData = [
      {
        name: 'Large Values',
        data: [
          [new Date('2024-01-01').getTime(), 1000000000],
          [new Date('2024-01-02').getTime(), 950000000],
          [new Date('2024-01-03').getTime(), 1100000000],
          [new Date('2024-01-04').getTime(), 1050000000],
        ] as Array<[number, number]>,
      },
      {
        name: 'Small Values',
        data: [
          [new Date('2024-01-01').getTime(), 100],
          [new Date('2024-01-02').getTime(), 50],
          [new Date('2024-01-03').getTime(), 200],
          [new Date('2024-01-04').getTime(), 0],
        ] as Array<[number, number]>,
      },
      {
        name: 'Medium Values',
        data: [
          [new Date('2024-01-01').getTime(), 500000],
          [new Date('2024-01-02').getTime(), 450000],
          [new Date('2024-01-03').getTime(), 550000],
          [new Date('2024-01-04').getTime(), 10],
        ] as Array<[number, number]>,
      },
    ];

    return (
      <Chart>
        <XAxis
          type="time"
          formatter={value => {
            const date = new Date(value);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          }}
        />
        <YAxis type="value" />
        <ChartTooltip />
        {extremeValueData.map(({ name, data }) => (
          <Bar name={name} data={data} key={name} barMinHeight={barMinHeight} />
        ))}
      </Chart>
    );
  },
};
