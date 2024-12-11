import React from 'react';
import {
  Chart,
  Grid,
  Header,
  Line,
  Tooltip,
  TooltipSortDirection,
  TooltipSortKey,
  XAxis,
  YAxis,
} from '@lg-charts/chart';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import type { StoryObj } from '@storybook/react';

import { Combobox, ComboboxOption } from '@leafygreen-ui/combobox';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';

import { ChartCard } from '..';

import { makeLineData } from './testUtils';

export default {
  title: 'Charts/ChartCard',
  component: ChartCard,
  args: {
    chartCardTitle: 'LeafyGreen ChartCard',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    chartCardTitle: {
      control: 'text',
      description: 'ChartCard title',
      name: 'Title',
      table: {
        category: 'ChartCard',
      },
    },
  },
};

interface ChartCardProps {
  chartCardTitle: 'string';
}

export const Basic: StoryObj<ChartCardProps> = {
  render: ({ chartCardTitle }) => {
    return <ChartCard title={chartCardTitle}></ChartCard>;
  },
};

export const ContainingChart: StoryObj<ChartCardProps> = {
  render: ({ chartCardTitle }) => {
    return (
      <ChartCard title={chartCardTitle}>
        <Chart>
          <Header title="Chart 1" showDivider />
          <Grid vertical={false} />
          <Tooltip
            sortDirection={TooltipSortDirection.Desc}
            sortKey={TooltipSortKey.Value}
          />
          <XAxis type="time" />
          <YAxis type="value" />
          {makeLineData(20).map(({ name, data }) => (
            <Line name={name} data={data} key={name} />
          ))}
        </Chart>
      </ChartCard>
    );
  },
};

export const WithHeaderContent: StoryObj<ChartCardProps> = {
  render: ({ chartCardTitle }) => {
    return (
      <ChartCard
        title={chartCardTitle}
        headerContent={
          <div style={{ display: 'flex', justifyContent: 'right' }}>
            <Combobox
              multiselect
              label=""
              initialValue={['User', 'Kernal']}
              size="small"
              style={{ maxWidth: '300px', marginRight: '8px' }}
            >
              <ComboboxOption value="User" />
              <ComboboxOption value="Kernal" />
              <ComboboxOption value="Other" />
            </Combobox>
            <IconButton aria-label="FullScreen">
              <Icon glyph="FullScreenEnter" />
            </IconButton>
            <IconButton aria-label="Close">
              <Icon glyph="X" />
            </IconButton>
          </div>
        }
      ></ChartCard>
    );
  },
};
