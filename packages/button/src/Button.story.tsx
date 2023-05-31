/* eslint-disable react/jsx-key */
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
  },
  parameters: {
    default: 'LiveExample',
    generate: {
      props: {
        darkMode: [false, true],
        rightGlyph: [undefined, <Icon glyph={'ArrowRight'} />],
        leftGlyph: [undefined, <Icon glyph={'Cloud'} />],
        children: ['MongoDB', undefined],
        size: Object.values(Size),
        variant: Object.values(Variant),
      },
      excludeCombinations: [
        {
          children: undefined,
          rightGlyph: undefined,
          leftGlyph: undefined,
        },
        {
          rightGlyph: <Icon glyph={'ArrowRight'} />,
          leftGlyph: <Icon glyph={'Cloud'} />,
          children: undefined,
        },
      ],
    },
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

interface StoryProps {
  leftGlyph: string;
  rightGlyph: string;
}

export const LiveExample: StoryType<typeof Button, StoryProps> = ({
  leftGlyph,
  rightGlyph,
  ...args
}: ButtonProps & StoryProps) => (
  <Button
    leftGlyph={leftGlyph ? <Icon glyph={leftGlyph} /> : undefined}
    rightGlyph={rightGlyph ? <Icon glyph={rightGlyph} /> : undefined}
    {...args}
  />
);

LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Generated = () => {};
