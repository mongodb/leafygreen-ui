import React from 'react';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { Size } from '@leafygreen-ui/tokens';

import { Format } from './Avatar/Avatar.types';
import { Avatar } from '.';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        format: Object.values(Format),
        size: Object.values(Size),
      },
    },
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    // name: { control: 'text' },
    size: {
      control: 'select',
      options: Size,
    },
    format: {
      control: 'select',
      options: Format,
    },
  },
  args: {
    format: Format.Default,
    size: Size.Default,
    name: 'アダモ トムソン',
  },
} satisfies StoryMetaType<typeof Avatar>;

export const LiveExample: StoryFn<typeof Avatar> = props => (
  <Avatar {...props} />
);

export const Generated: StoryFn<typeof Avatar> = () => <></>;
