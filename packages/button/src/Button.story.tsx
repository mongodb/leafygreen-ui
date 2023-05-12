/* eslint-disable react/display-name */
import React from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';

import Icon, { glyphs } from '@leafygreen-ui/icon';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMeta } from '@leafygreen-ui/lib';

import { Size } from './types';
import Button, { ButtonProps, Variant } from '.';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  // excludeStories: ['StoryButton'],
  // args: {
  //   children: 'MongoDB',
  //   variant: Variant.Default,
  // },
  // parameters: {
  //   default: 'Default',
  //   controls: {
  //     exclude: ['ref', 'onClick', 'className'],
  //   },
  // },
  // argTypes: {
  //   disabled: {
  //     control: { type: 'boolean' },
  //   },
  //   leftGlyph: {
  //     options: Object.keys(glyphs),
  //     control: { type: 'select' },
  //   },
  //   rightGlyph: {
  //     options: Object.keys(glyphs),
  //     control: { type: 'select' },
  //   },
  //   type: {
  //     control: 'select',
  //     options: ['button', 'submit'],
  //     defaultValue: 'button',
  //   },
  //   size: {
  //     control: 'select',
  //     options: Object.values(Size),
  //     defaultValue: Size.Default,
  //   },
  //   href: {
  //     control: 'text',
  //   },
  // },
};

export default meta;

// export const Basic: StoryFn<typeof Button> =
export const Basic: StoryObj<typeof Button> = {
  render: () => <Button />,
};

// const Template: StoryFn<ButtonProps> = ({
//   leftGlyph,
//   rightGlyph,
//   ...args
// }: ButtonProps) => (
//   <Button
//     // @ts-expect-error
//     leftGlyph={leftGlyph ? <Icon glyph={leftGlyph} /> : undefined}
//     // @ts-expect-error
//     rightGlyph={rightGlyph ? <Icon glyph={rightGlyph} /> : undefined}
//     {...args}
//   />
// );

// export const Default = Template.bind({});
// Default.args = {
//   variant: Variant.Default,
// };

// export const Primary = Template.bind({});
// Primary.args = {
//   variant: Variant.Primary,
// };

// export const PrimaryOutline = Template.bind({});
// PrimaryOutline.args = {
//   variant: Variant.PrimaryOutline,
// };

// export const Danger = Template.bind({});
// Danger.args = {
//   variant: Variant.Danger,
// };

// export const DangerOutline = Template.bind({});
// DangerOutline.args = {
//   variant: Variant.DangerOutline,
// };

// export const BaseGreen = Template.bind({});
// BaseGreen.args = {
//   variant: Variant.BaseGreen,
// };
