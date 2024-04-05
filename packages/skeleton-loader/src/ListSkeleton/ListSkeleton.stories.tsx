import React from 'react';
import { StoryMetaType, StoryType } from '@lg-tools/storybook-utils';

import { ListSkeleton, type ListSkeletonProps } from '.';

const meta: StoryMetaType<typeof ListSkeleton> = {
  title: 'Components/SkeletonList',
  component: ListSkeleton,
  parameters: {
    default: 'LiveExample',
  },
  args: {
    count: 5,
    bulletsOnly: false,
  },
};

export default meta;

export const LiveExample: StoryType<typeof ListSkeleton> = (
  args: ListSkeletonProps,
) => {
  return (
    <div style={{ width: 256 }}>
      <ListSkeleton {...args} />
    </div>
  );
};
