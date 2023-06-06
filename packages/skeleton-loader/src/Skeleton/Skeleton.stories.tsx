import React from 'react';
import { StoryFn } from '@storybook/react';

import { storybookArgTypes } from '@leafygreen-ui/lib';

import { Size, Skeleton } from '.';

export default {
  title: 'Components/SkeletonLoader/Skeleton',
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
  parameters: {
    default: 'Paragraph',
  },
};

export const Basic: StoryFn<typeof Skeleton> = props => <Skeleton {...props} />;
