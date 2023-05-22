import React from 'react';
import { StoryFn } from '@storybook/react';

import { storybookArgTypes, StoryMetaType } from '@leafygreen-ui/lib';

import Badge, { BadgeProps, Variant } from '.';

const meta: StoryMetaType<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    default: 'LiveExample',
    generate: {
      variant: Object.values(Variant),
      darkMode: [false, true],
    },
  },
  args: {
    children: 'Badge',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};
export default meta;

export const LiveExample: StoryFn<BadgeProps> = args => <Badge {...args} />;

export const Generated = () => {};
