import React from 'react';
import { Meta, Story } from '@storybook/react';

import Icon, { glyphs } from '@leafygreen-ui/icon';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import { storybookArgTypes } from '@leafygreen-ui/lib';
import {
  InferredPolymorphicProps,
  PolymorphicAs,
  PolymorphicProps,
} from '@leafygreen-ui/polymorphic';

import Button, { ButtonProps, Variant } from '.';

type ButtonRenderProps = PolymorphicProps<
  PolymorphicAs,
  InferredPolymorphicProps<ButtonProps>
>;

// TODO: Ensure that TSDocs are being read from the Button component directly, not this StoryButton component
/**
 * Buttons allow users to take actions, and make choices, with a single tap.
 */
export const StoryButton: React.FC<ButtonRenderProps> = props => (
  // @ts-ignore-next-line
  <Button {...props} />
);

export default {
  title: 'Components/Button',
  component: StoryButton,
  excludeStories: ['StoryButton'],
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
    onClick: {
      control: 'none',
    },
    type: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
    darkMode: {
      control: 'boolean',
    },
    href: {
      control: 'text',
    },
    children: storybookArgTypes.children,
    as: storybookArgTypes.as,
  },
} as Meta<ButtonRenderProps>;

const Template: Story<ButtonRenderProps> = ({
  leftGlyph,
  rightGlyph,
  ...args
}: ButtonRenderProps) => (
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

export const WithGlobalDarkMode: Story<ButtonRenderProps> = args => (
  <LeafygreenProvider darkMode={true}>
    <Button {...args}>Test</Button>
  </LeafygreenProvider>
);
