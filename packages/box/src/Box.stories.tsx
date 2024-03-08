import React from 'react';
import {
  storybookArgTypes,
  type StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import Box, { BoxProps } from '.';

// Intentionally not using `StoryMeta` since Box is different (and will soon be deprecated)
const meta: StoryMetaType<typeof Box, BoxProps> = {
  title: 'Components/Box',
  component: Box,
  parameters: {
    default: 'Basic',
  },
  argTypes: {
    as: {
      ...storybookArgTypes.as,
      defaultValue: 'div',
    },
    href: {
      control: 'text',
    },
  },
};
export default meta;

// eslint-disable-next-line react/prop-types
const Template: StoryFn<BoxProps> = ({ as, ...args }: BoxProps) => (
  <Box as={(as ? as : 'div') as keyof JSX.IntrinsicElements} {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  children: 'I am a div',
};

export const Anchor = Template.bind({});
Anchor.args = {
  href: 'https://mongodb.design',
  children: 'I am an anchor tag',
};

export const CustomComponent = Template.bind({});
CustomComponent.args = {
  as: 'button',
  children: 'I am a button tag',
};
