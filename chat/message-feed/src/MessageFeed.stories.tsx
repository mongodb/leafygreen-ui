/* eslint-disable react/prop-types */
import React, { ChangeEvent, useState } from 'react';
import { Avatar } from '@lg-chat/avatar';
import { DisclaimerText } from '@lg-chat/chat-disclaimer';
import { LeafyGreenChatProvider } from '@lg-chat/leafygreen-chat-provider';
import { Message } from '@lg-chat/message';
import { WithMessageRating as MessageFeedbackStory } from '@lg-chat/message-feedback/src/InlineMessageFeedback/InlineMessageFeedback.stories';
import { MessagePrompt, MessagePrompts } from '@lg-chat/message-prompts';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { Link } from '@leafygreen-ui/typography';

import baseMessages from './utils/baseMessages';
import { MessageFields } from './utils';
import { MessageFeed } from '.';

const meta: StoryMetaType<typeof MessageFeed> = {
  title: 'Chat/MessageFeed',
  component: MessageFeed,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
  parameters: {
    default: 'Basic',
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

const Template: StoryFn<typeof MessageFeed> = ({
  children,
  darkMode,
  ...rest
}) => (
  <LeafyGreenChatProvider>
    <MessageFeed
      style={{ width: 700, height: 400 }}
      darkMode={darkMode}
      {...rest}
    >
      <DisclaimerText title="Terms and Conditions">
        This is a test description. There&apos;s also a{' '}
        <Link>link inside of it</Link>.
      </DisclaimerText>
      {baseMessages.map(messageFields => (
        <MyMessage key={messageFields.id} {...messageFields} />
      ))}
    </MessageFeed>
  </LeafyGreenChatProvider>
);

export const Basic: StoryFn<typeof MessageFeed> = Template.bind({});

export const OneMessage: StoryFn<typeof MessageFeed> = ({
  darkMode,
  ...rest
}) => {
  const firstMessage = baseMessages[0] as MessageFields;
  return (
    <LeafyGreenChatProvider>
      <MessageFeed style={{ width: 700, height: 400 }} {...rest}>
        <DisclaimerText title="Terms and Conditions">
          This is a test description. There&apos;s also a{' '}
          <Link>link inside of it</Link>.
        </DisclaimerText>
        <MyMessage {...firstMessage} />
      </MessageFeed>
    </LeafyGreenChatProvider>
  );
};

export const ChangingMessages: StoryFn<typeof MessageFeed> = ({
  darkMode,
  ...rest
}) => {
  const [messages, setMessages] = useState<Array<any>>(baseMessages);
  const [newMessageId, setNewMessageId] = useState<number>(
    baseMessages.length + 1,
  );
  const [shouldAddMongoMessage, setShouldAddMongoMessage] =
    useState<boolean>(false);
  const toggleShouldAddMongoMessage = () =>
    setShouldAddMongoMessage(should => !should);

  const handleButtonClick = () => {
    const newMessage: MessageFields = {
      id: newMessageId.toString(),
      messageBody: 'This is a new message',
      ...(shouldAddMongoMessage
        ? {
            isMongo: true,
            messageRatingProps: {
              onChange: (e: ChangeEvent<HTMLInputElement>) =>
                // eslint-disable-next-line no-console
                console.log(`The new message was ${e.target.value}.`),
            },
          }
        : { userName: 'Sean Park' }),
    };
    setMessages(messages => [...messages, newMessage]);
    setNewMessageId(msgId => msgId + 1);
    toggleShouldAddMongoMessage();
  };

  return (
    <div>
      <LeafyGreenChatProvider>
        <MessageFeed style={{ width: 700, height: 400 }} {...rest}>
          <DisclaimerText title="Terms and Conditions">
            This is a test description. There&apos;s also a{' '}
            <Link>link inside of it</Link>.
          </DisclaimerText>
          {messages.map(message => {
            const { id, isMongo, messageBody, userName } =
              message as MessageFields;
            return (
              <>
                <Message
                  key={id}
                  sourceType="markdown"
                  darkMode={darkMode}
                  avatar={
                    <Avatar
                      variant={isMongo ? 'mongo' : 'user'}
                      darkMode={darkMode}
                      name={userName}
                    />
                  }
                  isSender={!!userName}
                  messageBody={messageBody}
                ></Message>
                {id === 1 && (
                  <MessagePrompts>
                    <MessagePrompt selected>
                      Can you tell me the answer to this thing?
                    </MessagePrompt>
                    <MessagePrompt>
                      Can you tell me the answer to that thing?
                    </MessagePrompt>
                  </MessagePrompts>
                )}
              </>
            );
          })}
        </MessageFeed>
      </LeafyGreenChatProvider>
      <button onClick={handleButtonClick}>Click me to add a message</button>
    </div>
  );
};
