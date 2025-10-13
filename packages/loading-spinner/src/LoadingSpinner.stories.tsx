import React from 'react';
import { StoryObj } from '@storybook/react';

import { LoadingSpinnerSize } from './LoadingSpinner/LoadingSpinner.types';
import { LoadingSpinner } from '.';

export default {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(LoadingSpinnerSize),
    },
    colorOverride: {
      control: 'color',
    },
  },
  args: {
    size: LoadingSpinnerSize.Default,
  },
};

export const LiveExample: StoryObj<typeof LoadingSpinner> = {
  render: args => <LoadingSpinner {...args} />,
};
