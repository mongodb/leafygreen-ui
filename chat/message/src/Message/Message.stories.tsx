import React from 'react';
import { Avatar } from '@lg-chat/avatar';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { WithMessageRating as MessageFeedbackStory } from '@lg-chat/message-feedback/src/InlineMessageFeedback/InlineMessageFeedback.stories';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { Message, MessageProps, MessageSourceType } from '..';

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
  title: 'Composition/Chat/Message',
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
    variant: {
      control: 'radio',
      options: Object.values(Variant),
    },
  },
  parameters: {
    default: null,
    exclude: ['children'],
    generate: {
      storyNames: ['CompactVariant', 'SpaciousVariant'],
      combineArgs: {
        darkMode: [false, true],
        isSender: [false, true],
        sourceType: Object.values(MessageSourceType),
        messageBody: [UserText, MarkdownText, MongoText],
      },
      decorator: (Instance, context) => {
        return (
          <LeafyGreenProvider darkMode={context?.args.darkMode}>
            <LeafyGreenChatProvider variant={context?.args.variant}>
              <Instance glyph={context?.args.glyph} />
            </LeafyGreenChatProvider>
          </LeafyGreenProvider>
        );
      },
    },
  },
};
export default meta;

type MessageStoryProps = MessageProps & {
  variant?: Variant;
};

const Template: StoryFn<MessageStoryProps> = ({ variant, ...props }) => (
  <LeafyGreenChatProvider variant={variant}>
    <Message {...props} />
  </LeafyGreenChatProvider>
);

export const LiveExample: StoryObj<MessageStoryProps> = {
  render: Template,
  args: {
    messageBody: UserText,
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Text: StoryObj<MessageStoryProps> = {
  render: Template,
  args: {
    messageBody: MarkdownText,
    sourceType: MessageSourceType.Text,
  },
};

export const Markdown: StoryObj<MessageStoryProps> = {
  render: Template,
  args: {
    messageBody: MarkdownText,
    sourceType: MessageSourceType.Markdown,
  },
};

export const Mongo: StoryObj<MessageStoryProps> = {
  render: Template,
  args: {
    avatar: <Avatar variant="mongo" />,
    isSender: false,
    messageBody: MongoText,
  },
};

export const WithMessageRating: StoryObj<MessageStoryProps> = {
  render: Template,
  args: {
    avatar: <Avatar variant="mongo" />,
    children: <MessageFeedback />,
    isSender: false,
    messageBody: MongoText,
  },
};

export const VerifiedAnswer: StoryObj<MessageStoryProps> = {
  render: Template,
  args: {
    avatar: <Avatar variant="mongo" />,
    children: <MessageFeedback />,
    isSender: false,
    messageBody: 'The MongoDB Atlas free tier includes 512MB of storage.',
    verified: {
      verifier: 'MongoDB Staff',
      verifiedAt: new Date('2023-08-24T16:20:00Z'),
    },
  },
};

const MultipleUserComponent = () => {
  const baseFontSize = useUpdatedBaseFontSize();
  return (
    <LeafyGreenChatProvider>
      <div>
        {/* replicate empty span used in `MessageFeed` */}
        <span />
        <Message
          {...meta.args}
          baseFontSize={baseFontSize}
          messageBody={UserText}
        />
        <Message
          {...meta.args}
          baseFontSize={baseFontSize}
          messageBody="Another message!"
        />
        {/* replicate empty span used in `MessageFeed` */}
        <span />
      </div>
    </LeafyGreenChatProvider>
  );
};
export const MultipleUser: StoryObj<MessageStoryProps> = {
  render: MultipleUserComponent,
};

const MultipleMongoComponent = () => {
  const baseFontSize = useUpdatedBaseFontSize();
  return (
    <LeafyGreenChatProvider>
      <div>
        {/* replicate empty span used in `MessageFeed` */}
        <span />
        <Message
          {...meta.args}
          avatar={<Avatar variant="mongo" />}
          messageBody="First message! Expect another from me right after this one."
          baseFontSize={baseFontSize}
          isSender={false}
        />
        <Message
          {...meta.args}
          avatar={<Avatar variant="mongo" />}
          baseFontSize={baseFontSize}
          isSender={false}
          messageBody={MongoText}
        />
        {/* replicate empty span used in `MessageFeed` */}
        <span />
      </div>
    </LeafyGreenChatProvider>
  );
};
export const MultipleMongo: StoryObj<MessageStoryProps> = {
  render: MultipleMongoComponent,
};

const AlternatingComponent = () => {
  const baseFontSize = useUpdatedBaseFontSize();
  return (
    <LeafyGreenChatProvider>
      <div>
        {/* replicate empty span used in `MessageFeed` */}
        <span />
        <Message
          {...meta.args}
          baseFontSize={baseFontSize}
          messageBody={UserText}
        />
        <Message
          {...meta.args}
          avatar={<Avatar variant="mongo" />}
          baseFontSize={baseFontSize}
          isSender={false}
          messageBody={MongoText}
        />
        {/* replicate empty span used in `MessageFeed` */}
        <span />
      </div>
    </LeafyGreenChatProvider>
  );
};
export const Alternating: StoryObj<MessageStoryProps> = {
  render: AlternatingComponent,
};

export const WithRichLinks: StoryObj<MessageStoryProps> = {
  render: Template,
  args: {
    avatar: <Avatar variant="mongo" />,
    children: <MessageFeedback />,
    isSender: false,
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
    messageBody: MongoText,
  },
};

export const CompactVariant: StoryObj<MessageStoryProps> = {
  render: Template,
  args: {
    variant: Variant.Compact,
  },
};

export const SpaciousVariant: StoryObj<MessageStoryProps> = {
  render: Template,
  args: {
    variant: Variant.Spacious,
  },
};
