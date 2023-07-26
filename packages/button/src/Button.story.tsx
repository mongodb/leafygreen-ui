/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
import React from 'react';
import { userEvent, within } from '@storybook/testing-library';

import Icon, { glyphs } from '@leafygreen-ui/icon';
import {
  type PlayFn,
  storybookArgTypes,
  type StoryMetaType,
  type StoryType,
} from '@leafygreen-ui/lib';
import { Spinner } from '@leafygreen-ui/loading-indicator';

import { Size } from './types';
import Button, { ButtonProps, Variant } from '.';

const meta: StoryMetaType<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    default: 'LiveExample',
    generate: {
      storyNames: ['LargeSize', 'DefaultSize', 'SmallSize', 'XSmallSize'],
      combineArgs: {
        darkMode: [false, true],
        rightGlyph: [undefined, <Icon glyph={'ArrowRight'} />],
        leftGlyph: [undefined, <Icon glyph={'Cloud'} />],
        children: ['MongoDB', undefined],
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
    loadingIndicator: <Spinner />,
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
LiveExample.parameters = {
  chromatic: {
    disableSnapshots: true,
  },
};

export const Focused: StoryType<typeof Button> = LiveExample.bind({});
Focused.play = (async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');
  await userEvent.click(button);
}) as PlayFn<typeof Button>;

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

export const Loading: StoryType<typeof Button> = () => <></>;
Loading.parameters = {
  generate: {
    combineArgs: {
      size: Object.values(Size),
      loadingText: [undefined, 'Saving'],
    },
    args: {
      isLoading: true,
      variant: Variant.Default,
      rightGlyph: undefined,
      leftGlyph: undefined,
      loadingIndicator: <Spinner />,
    },
  },
  // Avoids flakey Chromatic tests
  chromatic: {
    disableSnapshots: true,
  },
};
