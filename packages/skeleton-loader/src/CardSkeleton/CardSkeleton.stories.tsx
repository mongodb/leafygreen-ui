import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

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
