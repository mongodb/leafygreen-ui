/* eslint react/prop-types: 0 */
import React from 'react';
import { StoryFn } from '@storybook/react';

import { BoxProps } from '@leafygreen-ui/box';
import { defaultStorybookArgTypes, StoryMetaType } from '@leafygreen-ui/lib';

import Card, { CardProps } from '.';

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
    as: defaultStorybookArgTypes.as,
    darkMode: defaultStorybookArgTypes.darkMode,
    children: defaultStorybookArgTypes.children,
  },
};
export default meta;

const Template: StoryFn<CardProps & BoxProps> = ({
  as,
  ...args
}: CardProps & BoxProps) => (
  <Card as={(as ? as : 'div') as keyof JSX.IntrinsicElements} {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};
