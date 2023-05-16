/* eslint-disable react/jsx-key */
import React from 'react';
import { Story } from '@storybook/react';

import Icon, { glyphs } from '@leafygreen-ui/icon';
import { StoryMeta } from '@leafygreen-ui/lib';

import { Size } from './types';
import Button, { ButtonProps, Variant } from '.';

export default StoryMeta({
  title: 'Components/Button',
  component: Button,
  excludeStories: ['StoryButton'],
  args: {
    children: 'MongoDB',
  },
  parameters: {
    default: 'Default',
    generate: {
      variant: Object.values(Variant),
      rightGlyph: [undefined, <Icon glyph={'ArrowRight'} />],
      leftGlyph: [undefined, <Icon glyph={'Cloud'} />],
      size: Object.values(Size),
      darkMode: [false, true],
    },
  },
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    leftGlyph: {
      options: Object.keys(glyphs),
      control: { type: 'select' },
    },
    rightGlyph: {
      options: Object.keys(glyphs),
      control: { type: 'select' },
    },
    type: {
      control: 'select',
      options: ['button', 'submit'],
      defaultValue: 'button',
    },
    size: {
      control: 'select',
      options: Object.values(Size),
      defaultValue: Size.Default,
    },
    href: {
      control: 'text',
    },
  },
});

const Template: Story<ButtonProps> = ({
  leftGlyph,
  rightGlyph,
  ...args
}: ButtonProps) => (
  <Button
    // @ts-expect-error
    leftGlyph={leftGlyph ? <Icon glyph={leftGlyph} /> : undefined}
    // @ts-expect-error
    rightGlyph={rightGlyph ? <Icon glyph={rightGlyph} /> : undefined}
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {
  variant: Variant.Default,
};

export const Generated = () => {};
