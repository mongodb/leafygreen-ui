import React from 'react';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { ChatButton, type ChatButtonProps, Size, Variant } from '.';

const meta: StoryMetaType<typeof ChatButton> = {
  title: 'Composition/Chat/ChatButton',
  component: ChatButton,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        size: Object.values(Size),
        variant: Object.values(Variant),
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
    children: 'MongoDB Assistant',
    variant: Variant.Default,
  },
  argTypes: {
    baseFontSize: storybookArgTypes.updatedBaseFontSize,
    disabled: {
      control: { type: 'boolean' },
    },
    darkMode: storybookArgTypes.darkMode,
    size: {
      options: Object.values(Size),
      control: { type: 'select' },
      defaultValue: Size.Default,
    },
    variant: {
      options: Object.values(Variant),
      control: { type: 'select' },
      defaultValue: Variant.Default,
    },
  },
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

export const Generated: StoryObj<ChatButtonProps> = {
  render: () => <></>,
  parameters: {
    chromatic: {
      delay: 2500,
    },
  },
};
