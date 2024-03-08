/* eslint react/prop-types: 0 */
import React from 'react';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { BoxProps } from '@leafygreen-ui/box';

import Card, { CardProps } from '.';

const loremIpsum = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy children ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;

const meta: StoryMetaType<typeof Card, BoxProps> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        contentStyle: ['none', 'clickable'],
      },
    },
  },
  args: {
    children: loremIpsum,
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

export const LiveExample: StoryFn<CardProps & BoxProps> = ({
  as,
  ...args
}: CardProps & BoxProps) => (
  <Card as={(as ? as : 'div') as keyof JSX.IntrinsicElements} {...args} />
);
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const Generated = () => {};
