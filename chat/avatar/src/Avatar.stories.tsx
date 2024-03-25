import React from 'react';
import { LeafyGreenChatProvider } from '@lg-chat/leafygreen-chat-provider';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { Avatar } from '.';

export default {
  title: 'Chat/Avatar',
  component: Avatar,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    name: { control: 'text' },
    sizeOverride: { control: 'number' },
  },
};

const Template: StoryFn<typeof Avatar> = props => (
  <LeafyGreenChatProvider>
    <Avatar {...props} />
  </LeafyGreenChatProvider>
);

export const Basic: StoryFn<typeof Avatar> = Template.bind({});
