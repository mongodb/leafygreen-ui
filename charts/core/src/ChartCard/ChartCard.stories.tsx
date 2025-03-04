import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import type { StoryObj } from '@storybook/react';

import { HeaderProps } from '../Header/Header.types';
import { ChartCard } from '..';

export default {
  title: 'Charts/ChartCard',
  component: ChartCard,
  parameters: {
    generate: {
      combineArgs: {
        darkMode: [false, true],
        isOpen: [false, true],
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
  chartCardTitle: HeaderProps['title'];
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
