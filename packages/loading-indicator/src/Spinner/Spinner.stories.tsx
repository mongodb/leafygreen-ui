import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { Size } from '@leafygreen-ui/tokens';

import { SpinnerDirection } from './Spinner.types';
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
    description: {
      control: 'text',
    },
    direction: {
      control: 'select',
      options: Object.values(SpinnerDirection),
    },
  },
  args: {
    size: Size.Default,
    direction: SpinnerDirection.Vertical,
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

export const WithDescription: StoryObj<typeof Spinner> = {
  render: args => <Spinner {...args} />,
  args: {
    description: 'Loading...',
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const HorizontalDirection: StoryObj<typeof Spinner> = {
  render: args => <Spinner {...args} />,
  args: {
    description: 'Loading...',
    direction: SpinnerDirection.Horizontal,
  },
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
        description: [undefined, 'Loading...'],
        direction: Object.values(SpinnerDirection),
      },
      excludeCombinations: [
        {
          description: undefined,
          direction: SpinnerDirection.Horizontal,
        },
      ],
    },
  },
};
