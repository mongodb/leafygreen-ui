import React from 'react';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { MessageFeedProvider } from '../../MessageFeedContext';

import { InitialMessage, InitialMessageProps } from '.';

const messagePrompts = [
  <InitialMessage.MessagePrompts
    key="message-prompts"
    onClickRefresh={() => {}}
    label="Suggested Prompts"
  >
    <InitialMessage.MessagePromptsItem>
      What is MongoDB?
    </InitialMessage.MessagePromptsItem>
    <InitialMessage.MessagePromptsItem>
      How do I query MongoDB?
    </InitialMessage.MessagePromptsItem>
  </InitialMessage.MessagePrompts>,
];

const meta: StoryMetaType<typeof InitialMessage> = {
  title: 'Composition/Chat/MessageFeed/InitialMessage',
  component: InitialMessage,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        children: [messagePrompts, undefined],
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
