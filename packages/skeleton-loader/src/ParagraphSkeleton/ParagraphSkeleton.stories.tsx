import React from 'react';
import { StoryFn } from '@storybook/react';

import { storybookArgTypes } from '@leafygreen-ui/lib';

import { ParagraphSkeleton } from '.';

export default {
  title: 'Components/SkeletonLoader/Paragraph',
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
  parameters: {
    default: 'Paragraph',
  },
};

export const Paragraph: StoryFn<typeof ParagraphSkeleton> = props => (
  <ParagraphSkeleton {...props} />
);
