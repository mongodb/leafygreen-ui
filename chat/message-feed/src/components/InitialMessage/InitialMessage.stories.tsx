import React, { useState } from 'react';
import { Message } from '@lg-chat/message';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';

import { MessageFeed } from '../../MessageFeed';
import { MessageFeedProvider } from '../../MessageFeedContext';
import { baseMessages, MessageFields } from '../../utils/MessageFeed.testutils';

import { InitialMessage, InitialMessageProps } from '.';

const meta: StoryMetaType<typeof InitialMessage> = {
  title: 'Composition/Chat/MessageFeed/InitialMessage',
  component: InitialMessage,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
      },
      decorator: Instance => {
        return (
          <MessageFeedProvider shouldHideInitialMessage={false}>
            <Instance />
          </MessageFeedProvider>
        );
      },
    },
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
  args: {
    children: <div>I heard you like MongoDB</div>, // TODO: will replace with a real content in the next PR
  },
  decorators: [
    Instance => (
      <MessageFeedProvider shouldHideInitialMessage={false}>
        <Instance />
      </MessageFeedProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<InitialMessageProps> = props => (
  <InitialMessage {...props} />
);

export const LiveExample = {
  render: Template,
  args: {},
};

export const Generated = () => {};

// const MessageFeed = () => {
//   return (

//   )
// }

export const InitialMessageWithMessage = ({ ...rest }: InitialMessageProps) => {
  const [messages, setMessages] = useState<Array<any>>([]);

  const handleButtonClick = () => {
    setMessages([...messages, baseMessages[1]]);
  };

  return (
    <div>
      <MessageFeed style={{ width: 700, height: 400 }} {...rest}>
        <MessageFeed.InitialMessage>
          Filler content for initial message
        </MessageFeed.InitialMessage>
        {messages.map(message => {
          const { id, messageBody, userName } = message as MessageFields;
          return (
            <Message
              key={id}
              sourceType="markdown"
              isSender={!!userName}
              messageBody={messageBody}
            />
          );
        })}
      </MessageFeed>
      <button
        data-testid="add-message-button"
        onClick={() => handleButtonClick()}
      >
        Click me to add a message
      </button>
    </div>
  );
};

export const TransitioningWithMessage: StoryObj<InitialMessageProps> = {
  render: InitialMessageWithMessage,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByText('Filler content for initial message'),
    ).toBeVisible();

    // Click add message button
    const addMessageButton = canvas.getByTestId('add-message-button');

    // Click the message button to add a message
    await userEvent.click(addMessageButton);

    await waitFor(() =>
      expect(
        canvas.getByText('Filler content for initial message'),
      ).not.toBeVisible(),
    );
    await waitFor(() =>
      expect(canvas.getByText(baseMessages[1].messageBody)).toBeVisible(),
    );
  },
  parameters: {
    chromatic: {
      delay: 300,
    },
  },
};
