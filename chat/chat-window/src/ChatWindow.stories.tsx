import React, { useState } from 'react';
import { Avatar } from '@lg-chat/avatar';
import { InputBar } from '@lg-chat/input-bar';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { Message } from '@lg-chat/message';
import { MessageFeed } from '@lg-chat/message-feed';
import { MessagePrompt, MessagePrompts } from '@lg-chat/message-prompts';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';

import { DisplayMode, DrawerLayout } from '@leafygreen-ui/drawer';
import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { spacing } from '@leafygreen-ui/tokens';

import baseMessages from './utils/baseMessages';
import { ChatWindow, ChatWindowProps } from '.';

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

const meta: StoryMetaType<typeof ChatWindow> = {
  title: 'Composition/Chat/ChatWindow',
  component: ChatWindow,
  args: {
    assistantName: 'LeafyGreen Assistant',
    title: 'LG Chat Demo',
    badgeText: 'Beta',
  },
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
            <LeafyGreenChatProvider
              assistantName={context?.args.assistantName}
              variant={context?.args.variant}
            >
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
  hasMessageActions,
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
      {hasMessageActions && getActionsChild()}
    </Message>
  );
};

type ChatWindowStoryProps = ChatWindowProps & {
  assistantName?: string;
  variant?: Variant;
};

const Template: StoryFn<ChatWindowStoryProps> = ({
  assistantName,
  variant,
  ...props
}) => {
  const [messages, setMessages] = useState<Array<any>>(baseMessages);

  const handleMessageSend = (messageBody: string) => {
    const newMessage = {
      messageBody,
    };
    setMessages(messages => [...messages, newMessage]);
  };

  return (
    <LeafyGreenChatProvider assistantName={assistantName} variant={variant}>
      <ChatWindow {...props}>
        <MessageFeed>
          {messages.map(messageFields => (
            <MyMessage key={messageFields.id} {...messageFields} />
          ))}
        </MessageFeed>
        <InputBar onMessageSend={handleMessageSend} />
      </ChatWindow>
    </LeafyGreenChatProvider>
  );
};

export const LiveExample: StoryObj<ChatWindowStoryProps> = {
  render: Template,
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
};

const EmptyComponent = ({ variant, ...props }: ChatWindowStoryProps) => {
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
    <div
      className={css`
        height: 100vh;
        width: 100vw;
        margin: -100px;
      `}
    >
      <LeafyGreenChatProvider variant={variant}>
        <ChatWindow {...props}>
          <MessageFeed>
            {messages.map(messageFields => (
              <MyMessage key={messageFields.id} {...messageFields} />
            ))}
          </MessageFeed>
          <InputBar onMessageSend={handleMessageSend} />
        </ChatWindow>
      </LeafyGreenChatProvider>
    </div>
  );
};
export const Empty: StoryObj<ChatWindowStoryProps> = {
  render: EmptyComponent,
};

export const CompactVariant: StoryObj<ChatWindowStoryProps> = {
  render: Template,
  args: {
    children: (
      <>
        <MessageFeed>
          {baseMessages.map((messageFields: any) => (
            <MyMessage key={messageFields.id} {...messageFields} />
          ))}
        </MessageFeed>
        <InputBar />
      </>
    ),
    variant: Variant.Compact,
  },
};

export const SpaciousVariant: StoryObj<ChatWindowStoryProps> = {
  render: Template,
  args: {
    children: (
      <>
        <MessageFeed>
          {baseMessages.map((messageFields: any) => (
            <MyMessage key={messageFields.id} {...messageFields} />
          ))}
        </MessageFeed>
        <InputBar />
      </>
    ),
    variant: Variant.Spacious,
  },
};

const WithMessagePromptsComponent = ({
  variant,
  assistantName,
  ...props
}: ChatWindowStoryProps) => {
  const [messages, setMessages] = useState<Array<any>>([
    {
      id: 0,
      messageBody: 'Hello! How can I help you today?',
      isMongo: true,
    },
  ]);
  const [selectedPromptIndex, setSelectedPromptIndex] = useState<
    number | undefined
  >();

  const prompts = [
    'What is MongoDB?',
    'How do I create a database?',
    'Can you explain indexes?',
  ];

  const handlePromptSelect = (index: number) => {
    setSelectedPromptIndex(index);
    const selectedPrompt = prompts[index];

    // Add user message with selected prompt
    const userMessage = {
      id: messages.length,
      messageBody: selectedPrompt,
      userName: 'User',
    };

    // Add assistant response
    const assistantMessage = {
      id: messages.length + 1,
      messageBody: `Great question! Let me explain about "${selectedPrompt}"...`,
      isMongo: true,
    };

    setMessages(prev => [...prev, userMessage, assistantMessage]);
  };

  const handleMessageSend = (messageBody: string) => {
    const newMessage = {
      id: messages.length,
      messageBody,
      userName: 'User',
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <LeafyGreenChatProvider assistantName={assistantName} variant={variant}>
      <ChatWindow {...props}>
        <MessageFeed>
          <div style={{ flex: 1 }} aria-hidden="true" />
          {messages.map((messageFields, index) => (
            <Message
              key={messageFields.id}
              sourceType="markdown"
              avatar={
                <Avatar
                  variant={messageFields.isMongo ? 'mongo' : 'user'}
                  name={messageFields.userName}
                />
              }
              isSender={!!messageFields.userName}
              messageBody={messageFields.messageBody}
            >
              {index === 0 && (
                <MessagePrompts
                  label="Suggested Prompts"
                  enableHideOnSelect
                  onClickRefresh={() => {
                    // eslint-disable-next-line no-console
                    console.log('Refresh prompts');
                    setSelectedPromptIndex(undefined);
                  }}
                >
                  {prompts.map((prompt, promptIndex) => (
                    <MessagePrompt
                      key={prompt}
                      selected={selectedPromptIndex === promptIndex}
                      onClick={() => handlePromptSelect(promptIndex)}
                      data-testid={`prompt-${promptIndex}`}
                    >
                      {prompt}
                    </MessagePrompt>
                  ))}
                </MessagePrompts>
              )}
            </Message>
          ))}
        </MessageFeed>
        <InputBar onMessageSend={handleMessageSend} />
      </ChatWindow>
    </LeafyGreenChatProvider>
  );
};

export const WithMessagePrompts: StoryObj<ChatWindowStoryProps> = {
  render: WithMessagePromptsComponent,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

const ChatDrawerContent = ({
  assistantName,
  variant,
}: {
  assistantName?: string;
  variant: Variant;
}) => {
  const [messages, setMessages] = useState<Array<any>>(baseMessages);

  const handleMessageSend = (messageBody: string) => {
    const newMessage = {
      id: messages.length,
      messageBody,
      userName: 'User',
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  return (
    <LeafyGreenChatProvider assistantName={assistantName} variant={variant}>
      <ChatWindow>
        <MessageFeed>
          {messages.map(messageFields => (
            <MyMessage key={messageFields.id} {...messageFields} />
          ))}
        </MessageFeed>
        <InputBar onMessageSend={handleMessageSend} />
      </ChatWindow>
    </LeafyGreenChatProvider>
  );
};

const MainContent = () => {
  return (
    <main
      className={css`
        padding: ${spacing[400]}px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        gap: ${spacing[200]}px;
      `}
    >
      <div>
        <h2>Chat Demo with Drawer</h2>
        <p>Sample chat interface in drawer layout</p>
        <p>
          This example demonstrates how to use the ChatWindow component within a
          Drawer layout. The chat interface is displayed in the drawer panel,
          which can be toggled open or closed by clicking the chat icon in the
          toolbar.
        </p>
      </div>
    </main>
  );
};

const getToolbarData = ({
  assistantName,
  variant,
}: {
  assistantName?: string;
  variant: Variant;
}) => [
  {
    id: 'assistant',
    label: 'MongoDB Assistant',
    glyph: 'Sparkle' as const,
    title: 'MongoDB Assistant',
    content: (
      <ChatDrawerContent assistantName={assistantName} variant={variant} />
    ),
    hasPadding: false,
    resizable: true,
    scrollable: false,
  },
];

const InDrawerLayoutComponent: StoryFn<ChatWindowStoryProps> = ({
  assistantName,
  variant: _variant,
  darkMode,
}) => {
  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div
        className={css`
          margin: -100px;
          height: 100vh;
        `}
      >
        <DrawerLayout
          displayMode={DisplayMode.Embedded}
          toolbarData={getToolbarData({
            assistantName,
            variant: Variant.Compact,
          })}
        >
          <MainContent />
        </DrawerLayout>
      </div>
    </LeafyGreenProvider>
  );
};

export const InDrawerLayout: StoryObj<ChatWindowStoryProps> = {
  render: InDrawerLayoutComponent,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const chatButton = canvas.getByRole('button', {
      name: /MongoDB Assistant/i,
    });
    await userEvent.click(chatButton);
  },
  parameters: {
    chromatic: {
      delay: 400,
    },
  },
};
