import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { LoadingSpinnerSize } from './LoadingSpinner/LoadingSpinner.types';
import { LoadingSpinner } from '.';

export default {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    default: 'LiveExample',
  },
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
} satisfies StoryMetaType<typeof LoadingSpinner>;

export const LiveExample: StoryObj<typeof LoadingSpinner> = {
  render: args => <LoadingSpinner {...args} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Generated: StoryObj<typeof LoadingSpinner> = {
  render: () => <></>,
  parameters: {
    generate: {
      args: {
        disableAnimation: true,
      },
      combineArgs: {
        darkMode: [false, true],
        size: [...Object.values(LoadingSpinnerSize), 87],
        colorOverride: [undefined, '#f00'],
      },
    },
  },
};
