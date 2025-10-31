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

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { ChatLayout, type ChatLayoutProps, ChatMain, ChatSideNav } from '.';

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

const meta: StoryMetaType<typeof ChatLayout> = {
  title: 'Composition/Chat/ChatLayout',
  component: ChatLayout,
  parameters: {
    default: 'LiveExample',
  },
  decorators: [
    (Story, context) => (
      <div
        style={{
          margin: '-100px',
          height: '100vh',
          width: '100vw',
        }}
      >
        <LeafyGreenProvider darkMode={context?.args.darkMode}>
          <Story />
        </LeafyGreenProvider>
      </div>
    ),
  ],
};
export default meta;

const Template: StoryFn<ChatLayoutProps> = props => (
  <LeafyGreenChatProvider variant={Variant.Compact}>
    <ChatLayout {...props}>
      <ChatSideNav>
        <ChatSideNav.Header
          // eslint-disable-next-line no-console
          onClickNewChat={() => console.log('Clicked new chat')}
        />
        <ChatSideNav.Content>Content</ChatSideNav.Content>
      </ChatSideNav>
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
