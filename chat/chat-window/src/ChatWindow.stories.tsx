import React, { useState } from 'react';
import { Avatar } from '@lg-chat/avatar';
import { InputBar } from '@lg-chat/input-bar';
import { Message } from '@lg-chat/message';
import { MessageFeed } from '@lg-chat/message-feed';
import { WithMessageRating as MessageFeedbackStory } from '@lg-chat/message-feedback/src/InlineMessageFeedback/InlineMessageFeedback.stories';
import { MessagePrompt, MessagePrompts } from '@lg-chat/message-prompts';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import baseMessages from './utils/baseMessages';
import { ChatWindow } from '.';

const meta: StoryMetaType<typeof ChatWindow> = {
  title: 'Chat/ChatWindow',
  component: ChatWindow,
  args: {
    title: 'LG Chat Demo',
    badgeText: 'Beta',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
  parameters: {
    default: null,
  },
};

export default meta;

const MyMessage = ({
  id,
  isMongo,
  messageBody,
  userName,
  hasMessageRating,
}: any) => {
  return (
    <Message
      key={id}
      sourceType="markdown"
      avatar={<Avatar variant={isMongo ? 'mongo' : 'user'} />}
      isSender={!!userName}
      messageBody={messageBody}
    >
      {id === 0 && (
        <MessagePrompts>
          <MessagePrompt selected>
            Can you tell me the answer to this thing?
          </MessagePrompt>
          <MessagePrompt>
            Can you tell me the answer to that thing?
          </MessagePrompt>
        </MessagePrompts>
      )}
      {/* @ts-ignore onChange is passed in the story itself */}
      {hasMessageRating && <MessageFeedbackStory />}
    </Message>
  );
};

const Template: StoryFn<typeof ChatWindow> = props => {
  const [messages, setMessages] = useState<Array<any>>(baseMessages);

  const handleMessageSend = (messageBody: string) => {
    const newMessage = {
      messageBody,
    };
    setMessages(messages => [...messages, newMessage]);
  };

  return (
    <ChatWindow {...props}>
      <MessageFeed>
        {messages.map(messageFields => (
          <MyMessage key={messageFields.id} {...messageFields} />
        ))}
      </MessageFeed>
      <InputBar onMessageSend={handleMessageSend} />
    </ChatWindow>
  );
};

export const Basic: StoryFn<typeof ChatWindow> = Template.bind({});

export const Empty: StoryFn<typeof ChatWindow> = props => {
  const userName = 'Sean Park';
  const [messages, setMessages] = useState<Array<any>>([]);

  const handleMessageSend = (messageBody: string) => {
    const newMessage = {
      messageBody,
      userName,
    };
    setMessages(messages => [...messages, newMessage]);
  };

  return (
    <ChatWindow {...props}>
      <MessageFeed>
        {messages.map(messageFields => (
          <MyMessage key={messageFields.id} {...messageFields} />
        ))}
      </MessageFeed>
      <InputBar onMessageSend={handleMessageSend} />
    </ChatWindow>
  );
};
