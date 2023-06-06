import React from 'react';
import { StoryFn } from '@storybook/react';

import { storybookArgTypes } from '@leafygreen-ui/lib';

import { TableSkeleton } from '..';

export default {
  title: 'Components/SkeletonLoader',
  component: TableSkeleton,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    baseFontSize: storybookArgTypes.updatedBaseFontSize,
    columnLabels: { control: 'none' },
    numCols: { control: 'number' },
    numRows: { control: 'number' },
  },
  decorators: [
    (Story: StoryFn) => (
      <div style={{ width: 700 }}>
        <Story />
      </div>
    ),
  ],
};

const TableTemplate: StoryFn<typeof TableSkeleton> = props => (
  <TableSkeleton {...props} />
);

export const TableWithoutLabels: StoryFn<typeof TableSkeleton> =
  TableTemplate.bind({});

export const TableWithLabels: StoryFn<typeof TableSkeleton> =
  TableTemplate.bind({});
TableWithLabels.args = {
  columnLabels: ['Column 1', 'Column 2', 'Column 3', ''],
};
