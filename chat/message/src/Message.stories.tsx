import React from 'react';
import { Avatar } from '@lg-chat/avatar';
import { LeafyGreenChatProvider } from '@lg-chat/leafygreen-chat-provider';
import { WithMessageRating as MessageFeedbackStory } from '@lg-chat/message-feedback/src/InlineMessageFeedback/InlineMessageFeedback.stories';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { Message, MessageSourceType } from '.';

const StoryMarkdown = `
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

const meta: StoryMetaType<typeof Message> = {
  title: 'Chat/Message',
  component: Message,
  args: {
    messageBody: StoryMarkdown,
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

export const Text: StoryFn<typeof Message> = Template.bind({});
Text.args = {
  sourceType: MessageSourceType.Text,
};

export const Mongo: StoryFn<typeof Message> = Template.bind({});
Mongo.args = {
  isSender: false,
  avatar: <Avatar variant="mongo" />,
};

export const WithMessageRating: StoryFn<typeof Message> = Template.bind({});
WithMessageRating.args = {
  isSender: false,
  avatar: <Avatar variant="mongo" />,
  // @ts-ignore onChange is passed in the story itself
  children: <MessageFeedbackStory />,
};

export const MultipleUser = () => (
  <LeafyGreenChatProvider>
    <div>
      {/* @ts-expect-error baseFontSize is not a number */}
      <Basic {...meta.args} {...Basic.args} />
      {/* @ts-expect-error baseFontSize is not a number */}
      <Basic {...meta.args} {...Basic.args} />
    </div>
  </LeafyGreenChatProvider>
);

export const MultipleMongo = () => (
  <LeafyGreenChatProvider>
    <div>
      {/* @ts-expect-error baseFontSize is not a number */}
      <Mongo {...meta.args} {...Mongo.args} />
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
