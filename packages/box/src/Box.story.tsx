import React from 'react';
import Box, { BoxProps } from '.';
import { Meta, Story } from '@storybook/react';
import IntrinsicElements from '../../../.storybook/utils/IntrinsicElements';

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

export default {
  title: 'Packages/Box',
  component: StoryBox,
  excludeStories: ['StoryBox'],
  parameters: {
    controls: {
      exclude: ['ref'],
    },
  },
  argTypes: {
    as: {
      defaultValue: 'div',
      options: IntrinsicElements,
      type: { name: 'string' },
      control: { type: 'select' },
    },
  },
} as Meta<typeof Box>;

const Template: Story<
  BoxProps & { text: string }
  // eslint-disable-next-line react/prop-types
> = ({ text, as, ...args }) => (
  <Box as={(as ? as : 'div') as keyof JSX.IntrinsicElements} {...args}>
    {text}
  </Box>
);

export const Basic = Template.bind({});
Basic.args = {
  text: 'I am a div',
};

export const Anchor = Template.bind({});
Anchor.args = {
  href: 'https://mongodb.design',
  text: 'I am an anchor tag',
};

export const CustomComponent = Template.bind({});
CustomComponent.args = {
  as: 'button',
  text: 'I am a button tag',
};
