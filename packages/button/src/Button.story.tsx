import React from 'react';
import { Meta, Story } from '@storybook/react';

import Icon, { glyphs } from '@leafygreen-ui/icon';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import { storybookArgTypes } from '@leafygreen-ui/lib';
import { InferredPolymorphicProps, PolymorphicComponentType } from '@leafygreen-ui/polymorphic'

import Button, { ButtonProps, Variant } from '.';

export const StoryButton = (props: InferredPolymorphicProps<ButtonProps>) => (
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
} as Meta<PolymorphicComponentType>;

const Template: Story<InferredPolymorphicProps<ButtonProps>> = ({
  leftGlyph,
  rightGlyph,
  ...args
}: InferredPolymorphicProps<ButtonProps>) => (
  <Button
    leftGlyph={leftGlyph ? <Icon glyph={leftGlyph as unknown as string} /> : undefined}
    rightGlyph={rightGlyph ? <Icon glyph={rightGlyph as unknown as string} /> : undefined}
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

export const WithGlobalDarkMode: Story<PolymorphicComponentType> = args => (
  <LeafygreenProvider darkMode={true}>
    <Button {...args}>Test</Button>
  </LeafygreenProvider>
);
