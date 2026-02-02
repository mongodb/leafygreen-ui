import React from 'react';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { MessageFeedProvider } from '../../MessageFeedContext';

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
