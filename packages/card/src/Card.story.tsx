/* eslint react/prop-types: 0 */
import { BoxProps } from '@leafygreen-ui/box';
import { Story } from '@storybook/react';
import React from 'react';
import LGCard, { CardProps } from './Card';

// This is a workaround to make sure props are correctly imported despite Button using forwardRef
// https://github.com/storybookjs/storybook/issues/15334
// eslint-disable-next-line react/jsx-props-no-spreading
type CardStoryProps = BoxProps<'div', CardProps>;
export const Card: React.FC<CardStoryProps> = props => (
  // @ts-ignore-next-line
  <LGCard {...props} />
);

export default {
  title: 'Packages/Card',
  component: Card,
  excludeStories: ['Card'],
  args: {
    text: 'This is a card component.',
  },
};

const Template: Story<CardStoryProps & { text: string }> = ({
  text,
  as,
  ...args
}) => (
  <Card as={(as ? as : 'div') as keyof JSX.IntrinsicElements} {...args}>
    {text}
  </Card>
);

export const Basic = Template.bind({});
Basic.args = {};
