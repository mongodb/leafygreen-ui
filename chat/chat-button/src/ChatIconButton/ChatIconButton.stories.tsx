import React from 'react';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import { Size } from '@leafygreen-ui/icon-button';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { ChatIconButton } from './ChatIconButton';
import { ChatIconButtonProps } from './ChatIconButton.types';

const meta: StoryMetaType<typeof ChatIconButton> = {
  title: 'Composition/Chat/ChatButton/ChatIconButton',
  component: ChatIconButton,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        size: Object.values(Size),
      },
      decorator: (Instance, context) => (
        <LeafyGreenProvider darkMode={context?.args.darkMode}>
          <Instance />
        </LeafyGreenProvider>
      ),
    },
  },
  decorators: [
    (Story, context) => (
      <LeafyGreenProvider darkMode={context?.args.darkMode}>
        <Story />
      </LeafyGreenProvider>
    ),
  ],
  args: {
    'aria-label': 'MongoDB Assistant',
  },
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    darkMode: storybookArgTypes.darkMode,
    size: {
      options: Object.values(Size),
      control: { type: 'select' },
      defaultValue: Size.Default,
    },
  },
};
export default meta;

const Template: StoryFn<ChatIconButtonProps> = props => (
  <ChatIconButton {...props} />
);

export const LiveExample: StoryObj<ChatIconButtonProps> = {
  render: Template,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Generated: StoryObj<ChatIconButtonProps> = {
  render: () => <></>,
  parameters: {
    chromatic: {
      delay: 2500,
    },
  },
};
