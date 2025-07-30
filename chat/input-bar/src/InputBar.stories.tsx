import React, { ChangeEventHandler, useState } from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import {
  InputBar,
  type InputBarProps,
  State,
  SuggestedPrompt,
  SuggestedPrompts,
} from '.';

const meta: StoryMetaType<typeof InputBar> = {
  title: 'Composition/Chat/InputBar',
  component: InputBar,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        disabled: [false, true],
        disableSend: [false, true],
        state: Object.values(State),
        textareaProps: [
          { value: '' },
          { value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        ],
      },
      decorator: StoryFn => (
        <LeafyGreenChatProvider variant={Variant.Compact}>
          <StoryFn />
        </LeafyGreenChatProvider>
      ),
    },
  },
  args: {
    onMessageSend: (messageBody: string) => {
      // eslint-disable-next-line no-console
      console.log(`Message sent: ${messageBody}`);
    },
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    badgeText: { control: 'text' },
    shouldRenderGradient: { control: 'boolean' },
    disabled: { control: 'boolean' },
    disableSend: { control: 'boolean' },
    state: {
      control: { type: 'radio' },
      options: Object.values(State),
    },
    variant: {
      control: { type: 'radio' },
      options: Object.values(Variant),
    },
  },
};
export default meta;

type InputBarStoryProps = InputBarProps & {
  variant?: Variant;
};

const Template: StoryFn<InputBarStoryProps> = ({
  variant,
  ...props
}: InputBarStoryProps) => (
  <div style={{ width: '100%' }}>
    <LeafyGreenChatProvider variant={variant}>
      <InputBar {...props} />
    </LeafyGreenChatProvider>
  </div>
);

export const LiveExample: StoryObj<InputBarStoryProps> = {
  render: Template,
};

export const WithBadge: StoryObj<InputBarStoryProps> = {
  render: Template,
  args: {
    badgeText: 'Beta',
  },
};

export const WithHotkeyIndicator: StoryObj<InputBarStoryProps> = {
  render: Template,
  args: {
    shouldRenderHotkeyIndicator: true,
  },
};

export const WithDropdown: StoryObj<InputBarStoryProps> = {
  render: Template,
  args: {
    children: (
      <>
        <SuggestedPrompts label="Suggested Prompts">
          <SuggestedPrompt
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('SB: Click Apple');
            }}
          >
            Apple
          </SuggestedPrompt>
          <SuggestedPrompt
            disabled
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('SB: Click Banana');
            }}
          >
            Banana
          </SuggestedPrompt>
        </SuggestedPrompts>
        <SuggestedPrompts label="Recent Prompts">
          <SuggestedPrompt
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('SB: Click Oranges');
            }}
          >
            Oranges
          </SuggestedPrompt>
          <SuggestedPrompt
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('SB: Click Grapes');
            }}
          >
            Grapes
          </SuggestedPrompt>
        </SuggestedPrompts>
      </>
    ),
    dropdownProps: {},
  },
};

export const WithDropdownAndFooter: StoryObj<InputBarStoryProps> = {
  render: Template,
  args: {
    dropdownFooterSlot: <>This is a test</>,
    children: (
      <>
        <SuggestedPrompts label="Suggested Prompts">
          <SuggestedPrompt
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('SB: Click Apple');
            }}
          >
            Apple
          </SuggestedPrompt>
          <SuggestedPrompt
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('SB: Click Banana');
            }}
          >
            Banana
          </SuggestedPrompt>
        </SuggestedPrompts>
        <SuggestedPrompts label="Recent Prompts">
          <SuggestedPrompt
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('SB: Click Oranges');
            }}
          >
            Oranges
          </SuggestedPrompt>
          <SuggestedPrompt
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('SB: Click Grapes');
            }}
          >
            Grapes
          </SuggestedPrompt>
        </SuggestedPrompts>
      </>
    ),
  },
};

export const Controlled = (_: InputBarProps) => {
  const [inputVal, setInputVal] = useState<string>('');

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
    setInputVal(e.target.value);
  };

  const handleMessageSend = (messageBody: string) => {
    setInputVal('');
    // eslint-disable-next-line no-console
    console.log(`Message sent: ${messageBody}`);
  };

  return (
    <div style={{ width: '100%' }}>
      <LeafyGreenChatProvider>
        <InputBar
          onMessageSend={handleMessageSend}
          textareaProps={{
            value: inputVal,
            onChange: handleChange,
          }}
        />
      </LeafyGreenChatProvider>
    </div>
  );
};

export const Generated: StoryObj<InputBarStoryProps> = {
  render: Template,
  args: {
    variant: Variant.Compact,
  },
};
