import React from 'react';
import { Avatar } from '@lg-chat/avatar';
import { LeafyGreenChatProvider } from '@lg-chat/leafygreen-chat-provider';
import { WithMessageRating as MessageFeedbackStory } from '@lg-chat/message-feedback/src/InlineMessageFeedback/InlineMessageFeedback.stories';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { Message, MessageSourceType } from '..';

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
To efficiently delete a large number of documents from a MongoDB collection, you can use the \`deleteMany()\` method. This method allows you to delete multiple documents that match a specified filter.

Here's an example of how to use the \`deleteMany()\` method to delete a large number of documents:

\`\`\`javascript
db.collection.deleteMany({ <filter> });
\`\`\`

Keep in mind that deleting a large number of documents can be resource-intensive and may impact the performance of your MongoDB server. It's recommended to perform such operations during periods of low activity or to use techniques like sharding to distribute the load across multiple servers.

Let me know if you need any further assistance!
`;

const MessageFeedback = () => {
  // @ts-ignore onChange is passed in the story itself
  return <MessageFeedbackStory />;
};

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

const Template: StoryFn<typeof Message> = props => {
  return <Message {...props}></Message>;
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
  children: <MessageFeedback />,
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
  children: <MessageFeedback />,
};

export const MultipleUser = () => {
  const baseFontSize = useUpdatedBaseFontSize();
  return (
    <LeafyGreenChatProvider>
      <div>
        <Basic {...meta.args} {...Basic.args} baseFontSize={baseFontSize} />
        <Basic
          {...meta.args}
          {...Basic.args}
          messageBody="Another message!"
          baseFontSize={baseFontSize}
        />
      </div>
    </LeafyGreenChatProvider>
  );
};

export const MultipleMongo = () => {
  const baseFontSize = useUpdatedBaseFontSize();
  return (
    <LeafyGreenChatProvider>
      <div>
        <Mongo
          {...meta.args}
          {...Mongo.args}
          messageBody="First message! Expect another from me right after this one."
          baseFontSize={baseFontSize}
        />
        <Mongo {...meta.args} {...Mongo.args} baseFontSize={baseFontSize} />
      </div>
    </LeafyGreenChatProvider>
  );
};

export const Alternating = () => {
  const baseFontSize = useUpdatedBaseFontSize();
  return (
    <LeafyGreenChatProvider>
      <div>
        <Basic {...meta.args} {...Basic.args} baseFontSize={baseFontSize} />
        <Mongo {...meta.args} {...Mongo.args} baseFontSize={baseFontSize} />
      </div>
    </LeafyGreenChatProvider>
  );
};

export const WithRichLinks: StoryFn<typeof Message> = Template.bind({});
WithRichLinks.args = {
  isSender: false,
  messageBody: MongoText,
  avatar: <Avatar variant="mongo" />,
  children: <MessageFeedback />,
  links: [
    {
      href: 'https://mongodb.design',
      children: 'LeafyGreen UI',
      variant: 'Website',
    },
    {
      href: 'https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs',
      children: 'LeafyGreen UI Docs',
      variant: 'Docs',
    },
    {
      href: 'https://learn.mongodb.com/',
      children: 'MongoDB University',
      variant: 'Learn',
    },
    {
      href: 'https://mongodb.com/docs',
      children: 'MongoDB Docs',
      variant: 'Docs',
    },
    {
      href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      children: 'Rick Astley - Never Gonna Give You Up',
      variant: 'Video',
      imageUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    },
    {
      href: 'https://mongodb.com/',
      children: 'MongoDB Homepage',
      variant: 'Website',
    },
  ],
};
