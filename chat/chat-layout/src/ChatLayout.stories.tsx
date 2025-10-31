import React from 'react';
import { ChatWindow } from '@lg-chat/chat-window';
import { InputBar } from '@lg-chat/input-bar';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { Message } from '@lg-chat/message';
import { MessageFeed } from '@lg-chat/message-feed';
import { TitleBar } from '@lg-chat/title-bar';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';

import { ChatLayout, type ChatLayoutProps, ChatMain } from '.';

const meta: StoryMetaType<typeof ChatLayout> = {
  title: 'Composition/Chat/ChatLayout',
  component: ChatLayout,
  parameters: {
    default: 'LiveExample',
  },
  decorators: [
    Story => (
      <div
        style={{
          margin: '-100px',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default meta;

const sideNavPlaceholderStyles = css`
  background-color: rgba(0, 0, 0, 0.05);
  padding: 16px;
  min-width: 200px;
`;

const testMessages = [
  {
    id: '1',
    messageBody: 'Hello! How can I help you today?',
    isSender: false,
  },
  {
    id: '2',
    messageBody: 'I need help with my database query.',
  },
  {
    id: '3',
    messageBody:
      'Sure! I can help with that. What specific issue are you encountering?',
    isSender: false,
  },
];

const Template: StoryFn<ChatLayoutProps> = props => (
  <LeafyGreenChatProvider variant={Variant.Compact}>
    <ChatLayout {...props}>
      <div className={sideNavPlaceholderStyles}>ChatSideNav Placeholder</div>
      <ChatMain>
        <TitleBar title="Chat Assistant" />
        <ChatWindow>
          <MessageFeed>
            {testMessages.map(msg => (
              <Message
                key={msg.id}
                messageBody={msg.messageBody}
                isSender={msg.isSender}
              />
            ))}
          </MessageFeed>
          <InputBar onMessageSend={() => {}} />
        </ChatWindow>
      </ChatMain>
    </ChatLayout>
  </LeafyGreenChatProvider>
);

export const LiveExample: StoryObj<ChatLayoutProps> = {
  render: Template,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
