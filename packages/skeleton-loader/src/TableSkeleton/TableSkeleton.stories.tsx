import React from 'react';
import { StoryMetaType, StoryType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { TableSkeleton } from '..';

export default {
  title: 'Components/SkeletonLoader',
  component: TableSkeleton,
  parameters: {
    default: null,
    controls: { exclude: ['darkMode', 'ref'] },
    generate: {
      storyNames: ['Table'],
      combineArgs: {
        darkMode: [false, true],
        columnLabels: [undefined, ['Column 1', 'Column 2', 'Column 3', '']],
      },
    },
  },
  args: {
    enableAnimations: false,
    numCols: 4,
    numRows: 5,
  },
  argTypes: {
    columnLabels: { control: 'none' },
    numCols: { control: 'number' },
    numRows: { control: 'number' },
    enableAnimations: { control: 'boolean' },
  },
  decorators: [
    (Story: StoryFn) => (
      <div style={{ width: 700 }}>
        <Story />
      </div>
    ),
  ],
} satisfies StoryMetaType<typeof TableSkeleton>;

export const Table: StoryType<typeof TableSkeleton> = () => <></>;
