import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { Size } from '@leafygreen-ui/tokens';

import { Spinner } from '.';

export default {
  title: 'Composition/Loading/LoadingIndicator/Spinner',
  component: Spinner,
  parameters: {
    default: 'LiveExample',
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(Size),
    },
    colorOverride: {
      control: 'color',
    },
  },
  args: {
    size: Size.Default,
  },
} satisfies StoryMetaType<typeof Spinner>;

export const LiveExample: StoryObj<typeof Spinner> = {
  render: args => <Spinner {...args} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Generated: StoryObj<typeof Spinner> = {
  render: () => <></>,
  parameters: {
    generate: {
      args: {
        disableAnimation: true,
      },
      combineArgs: {
        darkMode: [false, true],
        size: [...Object.values(Size), 87],
        colorOverride: [undefined, '#f00'],
      },
    },
  },
};
