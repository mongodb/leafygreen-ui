import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { FormSkeleton } from '.';

export default {
  title: 'Components/SkeletonLoader',
  component: FormSkeleton,
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

export const Form: StoryFn<typeof FormSkeleton> = props => (
  <FormSkeleton {...props} />
);
