/* eslint react/prop-types: 0 */
import { BoxProps } from '@leafygreen-ui/box';
import { Story } from '@storybook/react';
import React from 'react';
import { storybookArgTypes } from '@leafygreen-ui/lib';
import { Card as LGCard, CardProps } from './Card';

// This is a workaround to make sure props are correctly imported despite Button using forwardRef
// https://github.com/storybookjs/storybook/issues/15334
// eslint-disable-next-line react/jsx-props-no-spreading
type CardStoryProps = BoxProps<'div', CardProps>;

// TODO: Import below comment directly from component definition.
/**
 * Cards are used to organize information into consumable chunks.
 */
export const Card: React.FC<CardStoryProps> = props => (
  // @ts-ignore-next-line
  <LGCard {...props} />
);

export default {
  title: 'Components/Card',
  component: Card,
  excludeStories: ['Card'],
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

const Template: Story<CardStoryProps> = ({ as, ...args }) => (
  <Card as={(as ? as : 'div') as keyof JSX.IntrinsicElements} {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};
