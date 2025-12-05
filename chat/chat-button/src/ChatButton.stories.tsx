import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { ChatButton, type ChatButtonProps } from '.';

const meta: StoryMetaType<typeof ChatButton> = {
  title: 'Composition/Chat/ChatButton',
  component: ChatButton,
  parameters: {
    default: 'LiveExample',
  },
  decorators: [
    (Story, context) => (
      <LeafyGreenProvider darkMode={context?.args.darkMode}>
        <Story />
      </LeafyGreenProvider>
    ),
  ],
};
export default meta;

const Template: StoryFn<ChatButtonProps> = props => <ChatButton {...props} />;

export const LiveExample: StoryObj<ChatButtonProps> = {
  render: Template,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
