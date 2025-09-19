import React from 'react';
import styled from '@emotion/styled';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { Message, MessageProps, MessageSourceType } from '..';

const MARKDOWN_TEXT = `
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

const USER_MESSAGE = `How can I delete a massive amount of documents from a collection?`;

const ASSISTANT_TEXT = `
To efficiently delete a large number of documents from a MongoDB collection, you can use the \`deleteMany()\` method. This method allows you to delete multiple documents that match a specified filter.

Here's an example of how to use the \`deleteMany()\` method to delete a large number of documents:

\`\`\`javascript
db.collection.deleteMany({ <filter> });
\`\`\`

Keep in mind that deleting a large number of documents can be resource-intensive and may impact the performance of your MongoDB server. It's recommended to perform such operations during periods of low activity or to use techniques like sharding to distribute the load across multiple servers.

Let me know if you need any further assistance!
`;

const getActionsChild = () => (
  <Message.Actions
    // eslint-disable-next-line no-console
    onClickCopy={() => console.log('Copy clicked')}
    // eslint-disable-next-line no-console
    onClickRetry={() => console.log('Retry clicked')}
    // eslint-disable-next-line no-console
    onRatingChange={() => console.log('Rating changed')}
    // eslint-disable-next-line no-console
    onSubmitFeedback={() => console.log('Feedback submitted')}
  />
);

const getVerifiedBannerChild = () => (
  <Message.VerifiedBanner
    verifier="MongoDB Staff"
    verifiedAt={new Date('2023-08-24T16:20:00Z')}
    learnMoreUrl="https://mongodb.com/docs"
  />
);

const getLinksChild = () => (
  <Message.Links
    links={[
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
      },
      {
        href: 'https://mongodb.com/',
        children: 'MongoDB Homepage',
        variant: 'Website',
      },
    ]}
  />
);

const getPromotionsChild = () => (
  <Message.Promotion
    promotionText="Go learn more about this skill!"
    promotionUrl="https://learn.mongodb.com/skills"
    // eslint-disable-next-line no-console
    onPromotionClick={() => console.log('Promotion clicked')}
  />
);

const getAllSpaciousArgs = () => {
  return {
    promotion: 'Go learn more about this skill!',
    promotionUrl: 'https://learn.mongodb.com/skills',
    // eslint-disable-next-line no-console
    onPromotionClick: () => console.log('Promotion clicked'),
    verified: {
      verifier: 'MongoDB Staff',
      verifiedAt: new Date('2023-08-24T16:20:00Z'),
      learnMoreUrl: 'https://mongodb.com/docs',
    },
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
      },
      {
        href: 'https://mongodb.com/',
        children: 'MongoDB Homepage',
        variant: 'Website',
      },
    ],
    linksHeading: 'Related Resources',
  };
};

const meta: StoryMetaType<typeof Message> = {
  title: 'Composition/Chat/Message',
  component: Message,
  args: {
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
        messageBody: [USER_MESSAGE, MARKDOWN_TEXT, ASSISTANT_TEXT],
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
    messageBody: USER_MESSAGE,
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
    messageBody: MARKDOWN_TEXT,
    sourceType: MessageSourceType.Text,
  },
};

export const Markdown: StoryObj<MessageStoryProps> = {
  render: Template,
  args: {
    messageBody: MARKDOWN_TEXT,
    sourceType: MessageSourceType.Markdown,
  },
};

export const Assistant: StoryObj<MessageStoryProps> = {
  render: Template,
  args: {
    isSender: false,
    messageBody: ASSISTANT_TEXT,
  },
};

export const WithActions: StoryObj<MessageStoryProps> = {
  render: Template,
  args: {
    children: getActionsChild(),
    isSender: false,
    messageBody: ASSISTANT_TEXT,
  },
};

export const WithVerifiedBanner: StoryObj<MessageStoryProps> = {
  render: Template,
  args: {
    children: getVerifiedBannerChild(),
    isSender: false,
    messageBody: ASSISTANT_TEXT,
  },
};

const StyledVerifiedBanner = styled(Message.VerifiedBanner)`
  background-color: lightgray;
`;

const WithStyledVerifiedBannerComponent = ({
  variant,
  ...props
}: MessageStoryProps) => {
  return (
    <LeafyGreenChatProvider variant={variant}>
      <Message {...props}>
        <StyledVerifiedBanner
          verifier="MongoDB Staff"
          verifiedAt={new Date('2023-08-24T16:20:00Z')}
          learnMoreUrl="https://mongodb.com/docs"
        />
      </Message>
    </LeafyGreenChatProvider>
  );
};
export const WithStyledVerifiedBanner: StoryObj<MessageStoryProps> = {
  render: WithStyledVerifiedBannerComponent,
  args: {
    isSender: false,
    messageBody: ASSISTANT_TEXT,
  },
};

export const WithMessageLinksCollapsed: StoryObj<MessageStoryProps> = {
  render: Template,
  args: {
    children: getLinksChild(),
    isSender: false,
    messageBody: ASSISTANT_TEXT,
  },
};

export const WithMessageLinksExpanded: StoryObj<MessageStoryProps> = {
  render: Template,
  args: {
    children: getLinksChild(),
    isSender: false,
    messageBody: ASSISTANT_TEXT,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByRole('button', { name: 'Expand Related Resources' }),
    );
  },
  parameters: {
    chromatic: {
      delay: 300,
    },
  },
};

export const WithPromotion: StoryObj<MessageStoryProps> = {
  render: Template,
  args: {
    children: getPromotionsChild(),
    isSender: false,
    messageBody: ASSISTANT_TEXT,
  },
};

export const CompactWithAllSubComponents: StoryObj<MessageStoryProps> = {
  render: Template,
  args: {
    variant: Variant.Compact,
    children: (
      <>
        {getActionsChild()}
        {getLinksChild()}
        {getPromotionsChild()}
        {getVerifiedBannerChild()}
      </>
    ),
    isSender: false,
    messageBody: ASSISTANT_TEXT,
  },
};

export const SpaciousWithAllSubComponents: StoryObj<MessageStoryProps> = {
  render: Template,
  args: {
    variant: Variant.Spacious,
    isSender: false,
    messageBody: ASSISTANT_TEXT,
    ...getAllSpaciousArgs(),
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
