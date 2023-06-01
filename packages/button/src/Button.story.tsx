/* eslint-disable react/display-name */
import React from 'react';

import Icon, { glyphs } from '@leafygreen-ui/icon';
import {
  StorybookArgTypes,
  type StoryMetaType,
  type StoryType,
} from '@leafygreen-ui/lib';

import { Size } from './types';
import Button, { ButtonProps, Variant } from '.';

const meta: StoryMetaType<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'MongoDB',
    variant: Variant.Default,
  },
  parameters: {
    default: 'Playground',
  },
  argTypes: {
    disabled: StorybookArgTypes.Boolean(),
    leftGlyph: StorybookArgTypes.Select(Object.keys(glyphs)),
    rightGlyph: StorybookArgTypes.Select(Object.keys(glyphs)),
    type: StorybookArgTypes.Select(['button', 'submit']),
    size: StorybookArgTypes.Select(Object.values(Size)),
    href: StorybookArgTypes.Text(),
  },
};

export default meta;

export const Playground: StoryType<typeof Button> = ({
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

export const BaseGreen = Playground.bind({});
BaseGreen.args = {
  variant: Variant.BaseGreen,
};
