import React, { ChangeEvent, Fragment, useState } from 'react';
import { Avatar } from '@lg-chat/avatar';
import { DisclaimerText } from '@lg-chat/chat-disclaimer';
import { LeafyGreenChatProvider } from '@lg-chat/leafygreen-chat-provider';
import { Message } from '@lg-chat/message';
import { WithMessageRating as MessageFeedbackStory } from '@lg-chat/message-feedback/src/InlineMessageFeedback/InlineMessageFeedback.stories';
import { MessagePrompt, MessagePrompts } from '@lg-chat/message-prompts';
import {
  storybookArgTypes,
  StoryMetaType,
  StoryType,
} from '@lg-tools/storybook-utils';

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

const Template: StoryType<typeof MessageFeed> = ({
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

export const Basic: StoryType<typeof MessageFeed> = Template.bind({});

export const OneMessage: StoryType<typeof MessageFeed> = ({
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

export const ChangingMessages: StoryType<typeof MessageFeed> = ({
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
