import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { Size, Skeleton } from '.';

export default {
  title: 'Components/SkeletonLoader',
  component: Skeleton,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    size: {
      control: 'select',
      options: Object.values(Size),
      defaultValue: Size.Default,
    },
  },
  decorators: [
    (Story: StoryFn) => (
      <div style={{ width: 700 }}>
        <Story />
      </div>
    ),
  ],
};

export const Basic: StoryFn<typeof Skeleton> = props => <Skeleton {...props} />;
