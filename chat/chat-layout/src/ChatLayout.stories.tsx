import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import { ChatLayout, type ChatLayoutProps } from '.';

const meta: StoryMetaType<typeof ChatLayout> = {
  title: 'Composition/Chat/ChatLayout',
  component: ChatLayout,
  parameters: {
    default: 'LiveExample',
  },
};
export default meta;

const Template: StoryFn<ChatLayoutProps> = props => <ChatLayout {...props} />;

export const LiveExample: StoryObj<ChatLayoutProps> = {
  render: Template,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
