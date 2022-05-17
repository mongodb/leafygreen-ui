import React, { ElementType } from 'react';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import Button, { Variant, ButtonProps } from '.';
import { BoxProps } from '@leafygreen-ui/box';
import { Meta, Story } from '@storybook/react';

type ButtonStoryProps = BoxProps<ElementType<HTMLButtonElement>, ButtonProps>;
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
  },
} as Meta<ButtonStoryProps>;

const Template: Story<ButtonStoryProps> = ({
  leftGlyph,
  rightGlyph,
  ...args
}: ButtonStoryProps) => (
  <Button
    // @ts-ignore-next-line
    leftGlyph={leftGlyph ? <Icon glyph={leftGlyph} /> : undefined}
    // @ts-ignore-next-line
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
