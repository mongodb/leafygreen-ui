import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { TableSkeleton } from '..';

export default {
  title: 'Components/SkeletonLoader/Table',
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

export const WithoutLabels: StoryFn<typeof TableSkeleton> = TableTemplate.bind(
  {},
);

export const WithLabels: StoryFn<typeof TableSkeleton> = TableTemplate.bind({});
WithLabels.args = {
  columnLabels: ['Column 1', 'Column 2', 'Column 3', ''],
};
