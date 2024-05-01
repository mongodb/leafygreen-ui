import React from 'react';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { Size } from '@leafygreen-ui/tokens';

import { Format } from './Avatar/Avatar.types';
import { Avatar } from '.';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    default: 'LiveExample',
    generate: {
      storyNames: ['MongoAvatar', 'TextAvatar', 'IconAvatar', 'ImageAvatar'],
      combineArgs: {
        darkMode: [false, true],
        size: Object.values(Size),
      },
    },
  },
} satisfies StoryMetaType<typeof Avatar>;

export const LiveExample: StoryObj<typeof Avatar> = {
  render: props => <Avatar {...props} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  args: {
    format: Format.Icon,
    size: Size.Default,
    glyph: 'Building',
    // @ts-expect-error - initial format does not allow text
    text: 'A',
    // name: 'アダモ トムソン',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    text: { control: 'text' },
    size: {
      control: 'select',
      options: Size,
    },
    format: {
      control: 'select',
      options: Format,
    },
  },
};

export const MongoAvatar: StoryObj<typeof Avatar> = {
  render: () => <></>,
  args: {
    format: Format.MongoDB,
  },
};
export const TextAvatar: StoryObj<typeof Avatar> = {
  render: () => <></>,
  parameters: {
    generate: {
      combineArgs: {
        text: ['A', 'AT'],
      },
    },
  },
  args: {
    format: Format.Text,
  },
};
export const IconAvatar: StoryObj<typeof Avatar> = {
  render: () => <></>,
  parameters: {
    generate: {
      combineArgs: {
        glyph: ['Person', 'GovernmentBuilding'],
      },
    },
  },
  args: {
    format: Format.Icon,
  },
};
// export const ImageAvatar: StoryObj<typeof Avatar> = {
//   render: () => <></>,
//   args: {
//     format: Format.MongoDB,
//   },
// };
