import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { CodeSkeleton } from '..';

export default {
  title: 'Components/SkeletonLoader',
  component: CodeSkeleton,
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

export const Code: StoryFn<typeof CodeSkeleton> = props => (
  <CodeSkeleton {...props} />
);
