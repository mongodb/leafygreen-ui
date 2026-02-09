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
    <InitialMessage.MessagePromptsItem>
      What is MongoDB&apos;s favorite color?
    </InitialMessage.MessagePromptsItem>
  </InitialMessage.MessagePrompts>,
];

const resourceList = [
  <InitialMessage.ResourceList key="resource-list">
    <InitialMessage.ResourceListItem glyph="QuestionMarkWithCircle">
      Ask me technical questions
    </InitialMessage.ResourceListItem>
    <InitialMessage.ResourceListItem glyph="Bulb">
      Learn best practices
    </InitialMessage.ResourceListItem>
    <InitialMessage.ResourceListItem glyph="InfoWithCircle">
      Note: I won’t have access to any of your data unless you provide it
    </InitialMessage.ResourceListItem>
  </InitialMessage.ResourceList>,
];

const meta: StoryMetaType<typeof InitialMessage> = {
  title: 'Composition/Chat/MessageFeed/InitialMessage',
  component: InitialMessage,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        children: [messagePrompts, resourceList, undefined],
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
