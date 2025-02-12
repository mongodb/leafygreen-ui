import React from 'react';
import {
  Chart,
  ChartCard,
  Grid,
  Header,
  Line,
  SortDirection,
  SortKey,
  Tooltip,
  XAxis,
  YAxis,
} from '@lg-charts/core';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import type { StoryObj } from '@storybook/react';

import { SortableChartContainer } from './SortableChartContainer';

export default {
  title: 'Charts/SortableChartContainer',
  component: ChartCard,
  args: {
    chartCardTitle: 'LeafyGreen ChartCard',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};

interface DragDropContainerProps {}

const renderChart = (id: string, sortable = true) => {
  return (
    <Chart sortId={sortable ? id : undefined}>
      <Header title={id} showDivider />
      <Grid vertical={false} />
      <Tooltip sortDirection={SortDirection.Desc} sortKey={SortKey.Value} />
      <XAxis type="value" />
      <YAxis type="value" />
      <Line
        name="Line 1"
        data={[
          [0, 0],
          [1, 1],
          [2, 2],
          [3, 3],
        ]}
      />
    </Chart>
  );
};

export const LiveExample: StoryObj<DragDropContainerProps> = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <SortableChartContainer>
          <ChartCard
            title="Chart Card 1"
            sortId="Chart Card 1"
            style={{ marginBottom: 16 }}
          >
            <SortableChartContainer>
              {renderChart('Chart 3')}
              {renderChart('Chart 4')}
            </SortableChartContainer>
          </ChartCard>
          <ChartCard
            title="Chart Card 2"
            sortId="Chart Card 2"
            style={{ marginBottom: 16 }}
          >
            <SortableChartContainer>
              {renderChart('Chart 5')}
              {renderChart('Chart 6')}
            </SortableChartContainer>
          </ChartCard>
          {renderChart('Chart 1')}
          {renderChart('Chart 2')}

          {/* <Chart sortId="Chart 1">
            <Header title="Chart 1" showDivider />
            <Grid vertical={false} />
            <Tooltip
              sortDirection={SortDirection.Desc}
              sortKey={SortKey.Value}
            />
            <XAxis type="value" />
            <YAxis type="value" />
            <Line
              name="Chart1"
              data={[
                [0, 0],
                [1, 1],
                [2, 2],
                [3, 3],
              ]}
            />
          </Chart>
          <Chart sortId="Chart 2">
            <Header title="Chart 2" showDivider />
            <Grid vertical={false} />
            <Tooltip
              sortDirection={SortDirection.Desc}
              sortKey={SortKey.Value}
            />
            <XAxis type="value" />
            <YAxis type="value" />
            <Line
              name="Chart2"
              data={[
                [0, 3],
                [1, 2],
                [2, 1],
                [3, 0],
              ]}
            />
          </Chart> */}
        </SortableChartContainer>
      </div>
    );
  },
};
