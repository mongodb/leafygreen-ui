/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
import React from 'react';

import Icon, { glyphs } from '@leafygreen-ui/icon';
import {
  storybookArgTypes,
  type StoryMetaType,
  type StoryType,
} from '@leafygreen-ui/lib';

import { Size } from './types';
import Button, { ButtonProps, Variant } from '.';

const meta: StoryMetaType<typeof Button> = {
  title: 'Components/Button',
  component: Button,

  parameters: {
    default: 'LiveExample',
    generate: {
      storyNames: ['LargeSize', 'DefaultSize', 'SmallSize', 'XSmallSize'],
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
  args: {
    children: 'MongoDB',
    leftGlyph: undefined,
    rightGlyph: undefined,
  },
  argTypes: {
    ...storybookArgTypes,
    disabled: {
      control: { type: 'boolean' },
    },
    darkMode: storybookArgTypes.darkMode,
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
    isLoading: {
      control: 'boolean',
    },
    loadingText: {
      control: 'text',
    },
  },
};

export default meta;

export const LiveExample: StoryType<typeof Button> = ({
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

export const LoadingState = LiveExample.bind({});
LoadingState.args = {
  isLoading: true,
};

export const LoadingStateWithText = LiveExample.bind({});
LoadingStateWithText.args = {
  isLoading: true,
  loadingText: 'Saving',
};

export const LargeSize: StoryType<typeof Button> = () => <></>;
LargeSize.parameters = {
  generate: {
    args: {
      size: Size.Large,
    },
  },
};

export const DefaultSize: StoryType<typeof Button> = () => <></>;
DefaultSize.parameters = {
  generate: {
    args: {
      size: Size.Default,
    },
  },
};

export const SmallSize: StoryType<typeof Button> = () => <></>;
SmallSize.parameters = {
  generate: {
    args: {
      size: Size.Small,
    },
  },
};

export const XSmallSize: StoryType<typeof Button> = () => <></>;
XSmallSize.parameters = {
  generate: {
    args: {
      size: Size.XSmall,
    },
  },
};
