import React from 'react';
import { StoryFn } from '@storybook/react';

import { storybookArgTypes } from '@leafygreen-ui/lib';

import { TableSkeleton } from '.';

export default {
  title: 'Components/SkeletonLoader',
  component: TableSkeleton,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    columnLabels: { control: 'none' },
    baseFontSize: storybookArgTypes.baseFontSize,
  },
  decorators: [
    (Story: StoryFn) => (
      <div style={{ width: 700 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    default: 'Paragraph',
  },
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
