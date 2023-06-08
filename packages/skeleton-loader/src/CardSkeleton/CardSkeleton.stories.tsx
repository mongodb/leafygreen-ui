import React from 'react';
import { StoryFn } from '@storybook/react';

import { storybookArgTypes } from '@leafygreen-ui/lib';

import { CardSkeleton } from '..';

export default {
  title: 'Components/SkeletonLoader',
  component: CardSkeleton,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
  decorators: [
    (Story: StoryFn) => (
      <div style={{ width: 700 }}>
        <Story />
      </div>
    ),
  ],
};

export const Card: StoryFn<typeof CardSkeleton> = props => (
  <CardSkeleton {...props} />
);
