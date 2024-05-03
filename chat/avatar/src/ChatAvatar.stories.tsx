import React from 'react';
import { LeafyGreenChatProvider } from '@lg-chat/leafygreen-chat-provider';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { Avatar, Size, Variant } from '.';

export default {
  title: 'Chat/Avatar',
  component: Avatar,
  decorators: [
    StoryFn => <LeafyGreenChatProvider>{StoryFn()}</LeafyGreenChatProvider>,
  ],
  parameters: {
    default: 'LiveExample',
    generate: {
      storyNames: ['DefaultVariant', 'MongoVariant', 'UserVariant'],
      combineArgs: {
        darkMode: [false, true],
        size: Object.values(Size),
        sizeOverride: [undefined, 56],
      },
      excludeCombinations: [
        {
          sizeOverride: 56,
          size: Size.Small,
        },
      ],
    },
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    variant: {
      control: 'select',
      options: Variant,
    },
    name: { control: 'text' },
    size: {
      control: 'select',
      options: Size,
    },
    sizeOverride: { control: 'number' },
  },
} satisfies StoryMetaType<typeof Avatar>;

export const LiveExample: StoryObj<typeof Avatar> = {
  render: props => <Avatar {...props} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const DefaultVariant: StoryObj<typeof Avatar> = {
  render: props => <Avatar {...props} />,
  args: {
    variant: Variant.Default,
  },
};
export const MongoVariant: StoryObj<typeof Avatar> = {
  render: props => <Avatar {...props} />,
  args: {
    variant: Variant.Mongo,
  },
};
export const UserVariant: StoryObj<typeof Avatar> = {
  render: props => <Avatar {...props} />,
  args: {
    variant: Variant.User,
    name: 'Maisie Williams',
  },
  parameters: {},
};
