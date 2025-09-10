import React from 'react';
import { ChartHeaderProps } from '@lg-charts/core';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import type { StoryObj } from '@storybook/react';

import { ChartCard } from '..';

export default {
  title: 'Composition/Charts/ChartCard',
  component: ChartCard,
  parameters: {
    generate: {
      combineArgs: {
        darkMode: [false, true],
        isOpen: [false, true],
        state: ['unset', 'overlay', 'dragging'],
      },
    },
  },
  args: {
    chartCardTitle: 'LeafyGreen ChartCard',
    headerContent: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'center',
          height: '100%',
        }}
      >
        Header Content
      </div>
    ),
    children: <div style={{ height: '300px' }}></div>,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    chartCardTitle: {
      control: 'text',
      description: 'ChartCard title',
      name: 'Title',
    },
    children: {
      table: {
        disable: true,
      },
    },
    defaultOpen: {
      table: {
        disable: true,
      },
    },
    headerContent: {
      table: {
        disable: true,
      },
    },
    isOpen: {
      table: {
        disable: true,
      },
    },
  },
};

interface ChartCardProps {
  chartCardTitle: ChartHeaderProps['title'];
  children: React.ReactNode;
  headerContent: React.ReactNode;
}

export const LiveExample: StoryObj<ChartCardProps> = {
  render: ({ chartCardTitle, children, headerContent }) => {
    return (
      <ChartCard title={chartCardTitle} headerContent={headerContent}>
        {children}
      </ChartCard>
    );
  },
};

export const Generated = () => {};
