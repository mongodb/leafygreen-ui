import React from 'react';
import { StoryMetaType, StoryType } from '@lg-tools/storybook-utils';

import { ListSkeleton, type ListSkeletonProps } from '.';

const meta: StoryMetaType<typeof ListSkeleton> = {
  title: 'Components/SkeletonLoader/List',
  component: ListSkeleton,
  parameters: {
    default: null,
  },
  args: {
    count: 5,
    bulletsOnly: false,
  },
};

export default meta;

export const Basic: StoryType<typeof ListSkeleton> = (
  args: ListSkeletonProps,
) => {
  return (
    <div style={{ width: 256 }}>
      <ListSkeleton {...args} />
    </div>
  );
};

export const BulletsOnly: StoryType<typeof ListSkeleton> = () => {
  return (
    <div style={{ width: 256 }}>
      <ListSkeleton bulletsOnly />
    </div>
  );
};
