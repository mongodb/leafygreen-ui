import React, { ChangeEvent, Fragment, useState } from 'react';
import { Avatar } from '@lg-chat/avatar';
import { DisclaimerText } from '@lg-chat/chat-disclaimer';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { Message } from '@lg-chat/message';
import { MessagePrompt, MessagePrompts } from '@lg-chat/message-prompts';
import { MessageRating } from '@lg-chat/message-rating';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Link } from '@leafygreen-ui/typography';

import {
  baseMessages,
  type MessageFields,
} from './utils/MessageFeed.testutils';
import { MessageFeed, type MessageFeedProps } from '.';

const meta: StoryMetaType<typeof MessageFeed> = {
  title: 'Composition/Chat/MessageFeed',
  component: MessageFeed,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    variant: {
      control: 'radio',
      options: Object.values(Variant),
    },
  },
  parameters: {
    default: 'LiveExample',
    generate: {
      storyNames: ['CompactVariant', 'SpaciousVariant'],
      combineArgs: {
        darkMode: [false, true],
      },
      decorator: (Instance, context) => {
        return (
          <LeafyGreenProvider darkMode={context?.args.darkMode}>
            <LeafyGreenChatProvider variant={context?.args.variant}>
              <Instance />
            </LeafyGreenChatProvider>
          </LeafyGreenProvider>
        );
      },
    },
  },
};
export default meta;

const MyMessage = ({
  id,
  isMongo,
  messageBody,
  userName,
  messageRatingProps,
}: MessageFields) => {
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
      {messageRatingProps && <MessageRating {...messageRatingProps} />}
    </Message>
  );
};

type MessageFeedStoryProps = MessageFeedProps & {
  variant?: Variant;
};

const Template: StoryFn<MessageFeedStoryProps> = ({
  children,
  variant,
  ...rest
}) => (
  <LeafyGreenChatProvider variant={variant}>
    <MessageFeed style={{ width: 700, height: 400 }} {...rest}>
      {children ?? (
        <>
          {variant === Variant.Spacious && (
            <DisclaimerText title="Terms and Conditions">
              This is a test description. There&apos;s also a{' '}
              <Link>link inside of it</Link>.
            </DisclaimerText>
          )}
          {baseMessages.map(messageFields => (
            <MyMessage key={messageFields.id} {...messageFields} />
          ))}
        </>
      )}
    </MessageFeed>
  </LeafyGreenChatProvider>
);

export const LiveExample: StoryObj<MessageFeedStoryProps> = {
  render: Template,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const OneMessage: StoryObj<MessageFeedStoryProps> = {
  render: Template,
  args: {
    children: (
      <>
        <DisclaimerText title="Terms and Conditions">
          This is a test description. There&apos;s also a{' '}
          <Link>link inside of it</Link>.
        </DisclaimerText>
        <MyMessage {...baseMessages[0]} />
      </>
    ),
  },
};

const ChangingMessagesComponent = ({
  darkMode,
  variant,
  ...rest
}: MessageFeedStoryProps) => {
  const [messages, setMessages] = useState<Array<any>>(baseMessages);
  const [newMessageId, setNewMessageId] = useState<number>(
    baseMessages.length + 1,
  );
  const [shouldAddMongoMessage, setShouldAddMongoMessage] =
    useState<boolean>(false);
  const toggleShouldAddMongoMessage = () =>
    setShouldAddMongoMessage(should => !should);

  const shortMessage = 'This is a new message';
  const longMessage =
    "To perform semantic search on your data using MongoDB Atlas, follow these best practices:\n\n1. **Create a Search Index**:\n   - Define a search index for your collection. This index will categorize your data in a searchable format, enabling faster retrieval of documents.\n\n2. **Use Analyzers for Tokenization**:\n   - Pre-process your data with analyzers to transform it into a sequence of tokens. This includes tokenization, normalization, and stemming. Choose the appropriate analyzer based on your data and application needs.\n\n3. **Construct Search Queries**:\n   - Build and run search queries using the `$search` aggregation pipeline stage. These queries can be simple text matches or more complex queries involving phrases, number or date ranges, regular expressions, or wildcards.\n\n4. **Customize Relevance Scores**:\n   - Modify the ranking of search results to boost certain documents or match specific relevance requirements. This helps in tailoring the search results to your application's domain.\n\n5. **Use Compound Queries**:\n   - Combine multiple operators and clauses in a single search query using the compound operator. This allows for more complex and refined search queries.\n\n6. **Implement Synonyms**:\n   - Configure synonyms to index and search collections for words with similar meanings. This enhances the search experience by accounting for different terms users might use.\n\n7. **Filter and Parse Results**:\n   - Use facets to group and count search results by multiple categories. This helps in quickly filtering and parsing the search results.\n\nBy following these best practices, you can optimize your semantic search capabilities in MongoDB Atlas and provide a more relevant and efficient search experience for your users.";

  const handleButtonClick = (messageBody = shortMessage) => {
    const newMessage: MessageFields = {
      id: newMessageId.toString(),
      messageBody,
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
      <LeafyGreenChatProvider variant={variant}>
        <MessageFeed style={{ width: 700, height: 400 }} {...rest}>
          <DisclaimerText title="Terms and Conditions">
            This is a test description. There&apos;s also a{' '}
            <Link>link inside of it</Link>.
          </DisclaimerText>
          {messages.map(message => {
            const { id, isMongo, messageBody, userName } =
              message as MessageFields;
            return (
              <Fragment key={id}>
                <Message
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
              </Fragment>
            );
          })}
        </MessageFeed>
      </LeafyGreenChatProvider>
      <button onClick={() => handleButtonClick(shortMessage)}>
        Click me to add a message
      </button>
      <button onClick={() => handleButtonClick(longMessage)}>
        Click me to add a long message
      </button>
    </div>
  );
};
export const ChangingMessages: StoryObj<MessageFeedStoryProps> = {
  render: ChangingMessagesComponent,
};

export const CompactVariant: StoryObj<MessageFeedStoryProps> = {
  render: Template,
  args: {
    children: (
      <>
        {baseMessages.map(messageFields => (
          <MyMessage key={messageFields.id} {...messageFields} />
        ))}
      </>
    ),
    variant: Variant.Compact,
  },
};

export const SpaciousVariant: StoryObj<MessageFeedStoryProps> = {
  render: Template,
  args: {
    children: (
      <>
        <DisclaimerText title="Terms and Conditions">
          This is a test description. There&apos;s also a{' '}
          <Link>link inside of it</Link>.
        </DisclaimerText>
        {baseMessages.map(messageFields => (
          <MyMessage key={messageFields.id} {...messageFields} />
        ))}
      </>
    ),
    variant: Variant.Spacious,
  },
};
