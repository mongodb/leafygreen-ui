import React from 'react';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { AvatarProps, AvatarSize, Format } from './Avatar/Avatar.types';
import { getInitials } from './utils/getInitials';
import { Avatar } from '.';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: ['text'],
    },
    generate: {
      storyNames: ['MongoAvatar', 'TextAvatar', 'IconAvatar', 'ImageAvatar'],
      combineArgs: {
        darkMode: [false, true],
        size: Object.values(AvatarSize),
      },
    },
  },
} satisfies StoryMetaType<typeof Avatar>;

export const LiveExample: StoryObj<AvatarProps & { name: string }> = {
  render: args => {
    const { initials } = getInitials(args.name);
    return <Avatar {...args} text={initials} />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  args: {
    format: Format.Icon,
    size: AvatarSize.Default,
    glyph: 'Building',
    name: 'Adam Thompson',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    size: {
      control: 'select',
      options: AvatarSize,
    },
    format: {
      control: 'select',
      options: Format,
    },
    name: {
      control: 'text',
      description:
        '**STORYBOOK ONLY**: Full name string that passes through `getInitials` before being passed into the `text` prop',
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
