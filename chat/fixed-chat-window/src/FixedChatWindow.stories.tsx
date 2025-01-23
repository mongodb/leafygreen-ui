import React, { useState } from 'react';
import { Avatar } from '@lg-chat/avatar';
import { InputBar } from '@lg-chat/input-bar';
import { LeafyGreenChatProvider } from '@lg-chat/leafygreen-chat-provider';
import { Message } from '@lg-chat/message';
import { MessageFeed } from '@lg-chat/message-feed';
import { WithMessageRating as MessageFeedbackStory } from '@lg-chat/message-feedback/src/InlineMessageFeedback/InlineMessageFeedback.stories';
import { MessagePrompt, MessagePrompts } from '@lg-chat/message-prompts';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';

import baseMessages from './utils/baseMessages';
import { FixedChatWindow } from '.';

const meta: StoryMetaType<typeof FixedChatWindow> = {
  title: 'Chat/FixedChatWindow',
  component: FixedChatWindow,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
  parameters: {
    default: 'Uncontrolled',
  },
  decorators: [
    StoryFn => (
      <div
        className={css`
          width: 100vw;
          height: 100vh;
          padding: 0;
        `}
      >
        <StoryFn />
      </div>
    ),
  ],
};

export default meta;

const MyMessage = ({
  id,
  isMongo,
  messageBody,
  userName,
  messageRatingProps,
}: any) => (
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
        <MessagePrompt>Can you tell me the answer to that thing?</MessagePrompt>
      </MessagePrompts>
    )}
    {!!messageRatingProps && (
      /* @ts-ignore onChange is passed in the story itself */
      <MessageFeedbackStory
        className={css`
          min-width: unset;
        `}
      />
    )}
  </Message>
);

const containerStyles = css`
  position: fixed;
  bottom: 16px;
  right: 32px;
`;

export const Uncontrolled: StoryFn<typeof FixedChatWindow> = props => {
  const userName = 'Sean Park';
  const [messages, setMessages] = useState<Array<any>>(baseMessages);

  const handleMessageSend = (messageBody: string) => {
    const newMessage = {
      messageBody,
      userName,
    };
    setMessages(messages => [...messages, newMessage]);
  };

  return (
    <div className={containerStyles}>
      <LeafyGreenChatProvider>
        <FixedChatWindow
          {...props}
          defaultOpen
          title="LG Chat Demo"
          badgeText="Beta"
          triggerText="MongoDB AI"
        >
          <MessageFeed>
            {messages.map(messageFields => (
              <MyMessage key={messageFields.id} {...messageFields} />
            ))}
          </MessageFeed>
          <InputBar onMessageSend={handleMessageSend} />
        </FixedChatWindow>
      </LeafyGreenChatProvider>
    </div>
  );
};

export const Controlled: StoryFn<typeof FixedChatWindow> = props => {
  const userName = 'Sean Park';
  const [messages, setMessages] = useState<Array<any>>(baseMessages);
  const [open, setOpen] = useState<boolean>(true);

  const handleMessageSend = (messageBody: string) => {
    const newMessage = {
      messageBody,
      userName,
    };
    setMessages(messages => [...messages, newMessage]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTriggerClick = () => {
    setOpen(o => !o);
  };

  return (
    <div className={containerStyles}>
      <LeafyGreenChatProvider>
        <FixedChatWindow
          {...props}
          defaultOpen
          title="LG Chat Demo"
          badgeText="Beta"
          triggerText="MongoDB AI"
          open={open}
          onClose={handleClose}
          onTriggerClick={handleTriggerClick}
        >
          <MessageFeed>
            {messages.map(messageFields => (
              <MyMessage key={messageFields.id} {...messageFields} />
            ))}
          </MessageFeed>
          <InputBar onMessageSend={handleMessageSend} />
        </FixedChatWindow>
      </LeafyGreenChatProvider>
    </div>
  );
};

export const Empty: StoryFn<typeof FixedChatWindow> = props => {
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
    <div className={containerStyles}>
      <LeafyGreenChatProvider>
        <FixedChatWindow
          {...props}
          defaultOpen
          title="LG Chat Demo"
          badgeText="Beta"
          triggerText="MongoDB AI"
        >
          <MessageFeed>
            {messages.map(messageFields => (
              <MyMessage key={messageFields.id} {...messageFields} />
            ))}
          </MessageFeed>
          <InputBar onMessageSend={handleMessageSend} />
        </FixedChatWindow>
      </LeafyGreenChatProvider>
    </div>
  );
};
