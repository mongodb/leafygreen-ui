import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { ParagraphSkeleton } from '.';

export default {
  title: 'Components/SkeletonLoader',
  component: ParagraphSkeleton,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    withHeader: { control: 'boolean' },
  },
  decorators: [
    (Story: StoryFn) => (
      <div style={{ width: 700 }}>
        <Story />
      </div>
    ),
  ],
};

export const Paragraph: StoryFn<typeof ParagraphSkeleton> = props => (
  <ParagraphSkeleton {...props} />
);
