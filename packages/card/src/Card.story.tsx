/* eslint react/prop-types: 0 */
import React from 'react';
import { StoryFn } from '@storybook/react';

import { BoxProps } from '@leafygreen-ui/box';
import { storybookArgTypes, StoryMetaType } from '@leafygreen-ui/lib';

import { Card, CardProps } from '.';

const meta: StoryMetaType<typeof Card, BoxProps> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    default: 'Basic',
  },
  args: {
    children: 'This is a card component.',
    darkMode: false,
  },
  argTypes: {
    href: { control: 'text' },
    as: storybookArgTypes.as,
    darkMode: storybookArgTypes.darkMode,
    children: storybookArgTypes.children,
  },
};
export default meta;

const Template: StoryFn<CardProps & BoxProps> = ({ as, ...args }) => (
  <Card as={(as ? as : 'div') as keyof JSX.IntrinsicElements} {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};
