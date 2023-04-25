import React from 'react';
import { Meta, Story } from '@storybook/react';

import { storybookArgTypes } from '@leafygreen-ui/lib';

import Box, { BoxProps } from '.';

// This is a workaround to make sure props are correctly imported despite Button using forwardRef
// https://github.com/storybookjs/storybook/issues/15334
// TODO: Ensure that TSDocs are being read from the Box component directly, not this StoryBox component
// eslint-disable-next-line react/jsx-props-no-spreading
/**
 * Box component handles the `as` prop, allowing the component to be rendered using alternate HTML elements.
 *
 * It also defaults to an `<a>` tag when a `href` prop is set.
 */
export const StoryBox: React.FC<BoxProps> = props => (
  // @ts-ignore-next-line
  <Box {...props} />
);

// Intentionally not using `StoryMeta` since Box is different (and will soon be deprecated)
export default {
  title: 'Components/Box',
  component: StoryBox,
  excludeStories: ['StoryBox'],
  argTypes: {
    as: {
      ...storybookArgTypes.as,
      defaultValue: 'div',
    },
    href: {
      control: 'text',
    },
  },
} as Meta<typeof Box>;

// eslint-disable-next-line react/prop-types
const Template: Story<BoxProps> = ({ as, ...args }) => (
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
