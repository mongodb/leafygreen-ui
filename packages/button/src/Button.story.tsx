import React, { FC, ReactElement } from 'react';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import Button, { Variant, ButtonProps } from '.';
import { BoxProps, ExtendableBox } from '@leafygreen-ui/box';
import { ComponentStory, Meta, Story } from '@storybook/react';
import { HTMLElementProps } from '@leafygreen-ui/lib';

type ButtonStoryProps = BoxProps<HTMLButtonElement, ButtonProps>;
export const StoryButton: React.FC<ButtonStoryProps> = props => (
  // @ts-ignore-next-line
  <Button {...props} />
);

export default {
  title: 'Packages/Button',
  component: StoryButton,
  args: {
    children: 'MongoDB',
  },
  argTypes: {
    leftGlyph: {
      options: Object.keys(glyphs),
      control: { type: 'select' },
    },
    rightGlyph: {
      options: Object.keys(glyphs),
      control: { type: 'select' },
    },
  },
} as Meta<ButtonStoryProps>;

const Template: Story<ButtonStoryProps> = ({ leftGlyph, rightGlyph, ...args }) => (
  <Button
    leftGlyph={leftGlyph ? <Icon glyph={leftGlyph} /> : undefined}
    rightGlyph={rightGlyph ? <Icon glyph={rightGlyph} /> : undefined}
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {
  variant: Variant.Default,
};

export const Primary = Template.bind({});
Primary.args = {
  variant: Variant.Primary,
};

export const PrimaryOutline = Template.bind({});
PrimaryOutline.args = {
  variant: Variant.PrimaryOutline,
};

export const Danger = Template.bind({});
Danger.args = {
  variant: Variant.Danger,
};

export const DangerOutline = Template.bind({});
DangerOutline.args = {
  variant: Variant.DangerOutline,
};

export const BaseGreen = Template.bind({});
BaseGreen.args = {
  variant: Variant.BaseGreen,
};
