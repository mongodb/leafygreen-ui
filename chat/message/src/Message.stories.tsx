import React from 'react';
import { Avatar } from '@lg-chat/avatar';
import { LeafyGreenChatProvider } from '@lg-chat/leafygreen-chat-provider';
import { WithMessageRating as MessageFeedbackStory } from '@lg-chat/message-feedback/src/InlineMessageFeedback/InlineMessageFeedback.stories';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { Message, MessageSourceType } from '.';

const MarkdownText = `
# Heading 1

## Heading 2

### Heading 3

This is a paragraph.

Each paragraph can span multiple lines. And have multiple sentences!

A paragraph can also contain formatted text, like *italics* or **bold** words.

You can link to a URL using markdown link notation, e.g. [LeafyGreen UI](mongodb.design)

If you want to talk about code in a paragraph, you can use \`inline code\`. Wow!

Or you can use a markdown code block like this:

\`\`\`typescript
type HelloWorld = "Hello, world!"

function helloWorld() {
  return "Hello, world!" satisfies HelloWorld;
}
\`\`\`

- [https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs](https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs)
- [https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs](https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs)
- [https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs](https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs)
`;

const UserText = `How can I delete a massive amount of documents from a collection?`;

const MongoText = `
To efficiently delete a large number of documents from a MongoDB collection, you
can use the \`deleteMany()\` method. This method allows you to delete multiple
documents that match a specified filter.

Here's an example of how to use the \`deleteMany()\` method to delete a large
number of documents:

\`\`\`javascript
db.collection.deleteMany({ <filter> });
\`\`\`

Keep in mind that deleting a large number of documents can be resource-intensive
and may impact the performance of your MongoDB server. It's recommended to
perform such operations during periods of low activity or to use techniques like
sharding to distribute the load across multiple servers.

Let me know if you need any further assistance!
`;

const meta: StoryMetaType<typeof Message> = {
  title: 'Chat/Message',
  component: Message,
  args: {
    avatar: <Avatar variant="user" name="Sean Park" />,
    sourceType: MessageSourceType.Markdown,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    isSender: { control: 'boolean' },
    avatar: { control: 'none' },
    components: { control: 'none' },
    markdownProps: { control: 'none' },
  },
  parameters: {
    default: null,
    exclude: ['children'],
  },
};
export default meta;

// eslint-disable-next-line react/prop-types
const Template: StoryFn<typeof Message> = ({ darkMode, avatar, ...rest }) => {
  const Avatar = avatar ? React.cloneElement(avatar, { darkMode }) : undefined;
  return <Message avatar={Avatar} darkMode={darkMode} {...rest} />;
};

export const Basic: StoryFn<typeof Message> = Template.bind({});
Basic.args = {
  messageBody: UserText,
};

export const Text: StoryFn<typeof Message> = Template.bind({});
Text.args = {
  messageBody: MarkdownText,
  sourceType: MessageSourceType.Text,
};

export const Markdown: StoryFn<typeof Message> = Template.bind({});
Markdown.args = {
  messageBody: MarkdownText,
  sourceType: MessageSourceType.Markdown,
};

export const Mongo: StoryFn<typeof Message> = Template.bind({});
Mongo.args = {
  isSender: false,
  messageBody: MongoText,
  avatar: <Avatar variant="mongo" />,
};

export const WithMessageRating: StoryFn<typeof Message> = Template.bind({});
WithMessageRating.args = {
  isSender: false,
  messageBody: MongoText,
  avatar: <Avatar variant="mongo" />,
  // @ts-ignore onChange is passed in the story itself
  children: <MessageFeedbackStory />,
};

export const VerifiedAnswer: StoryFn<typeof Message> = Template.bind({});
VerifiedAnswer.args = {
  isSender: false,
  messageBody: 'The MongoDB Atlas free tier includes 512MB of storage.',
  avatar: <Avatar variant="mongo" />,
  verified: {
    verifier: 'MongoDB Staff',
    verifiedAt: new Date('2023-08-24T16:20:00Z'),
  },
  // @ts-ignore onChange is passed in the story itself
  children: <MessageFeedbackStory />,
};

export const MultipleUser = () => (
  <LeafyGreenChatProvider>
    <div>
      {/* @ts-expect-error baseFontSize is not a number */}
      <Basic {...meta.args} {...Basic.args} />
      {/* @ts-expect-error baseFontSize is not a number */}
      <Basic {...meta.args} {...Basic.args} messageBody="Another message!" />
    </div>
  </LeafyGreenChatProvider>
);

export const MultipleMongo = () => (
  <LeafyGreenChatProvider>
    <div>
      {/* @ts-expect-error baseFontSize is not a number */}
      <Mongo
        {...meta.args}
        {...Mongo.args}
        messageBody="First message! Expect another from me right after this one."
      />
      {/* @ts-expect-error baseFontSize is not a number */}
      <Mongo {...meta.args} {...Mongo.args} />
    </div>
  </LeafyGreenChatProvider>
);

export const Alternating = () => (
  <LeafyGreenChatProvider>
    <div>
      {/* @ts-expect-error baseFontSize is not a number */}
      <Basic {...meta.args} {...Basic.args} />
      {/* @ts-expect-error baseFontSize is not a number */}
      <Mongo {...meta.args} {...Mongo.args} />
    </div>
  </LeafyGreenChatProvider>
);
