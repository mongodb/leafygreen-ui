import React, { ChangeEventHandler, useState } from 'react';
import { LeafyGreenChatProvider } from '@lg-chat/leafygreen-chat-provider';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { InputBar, InputBarProps, SuggestedPrompt, SuggestedPrompts } from '.';

export default {
  title: 'Chat/InputBar',
  component: InputBar,
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
  },
};

const Template: StoryFn<typeof InputBar> = props => (
  <div style={{ width: '100%' }}>
    <LeafyGreenChatProvider>
      <InputBar {...props} />
    </LeafyGreenChatProvider>
  </div>
);

export const Basic = Template.bind({});

export const WithBadge = Template.bind({});
WithBadge.args = {
  badgeText: 'Beta',
};

export const WithDropdown = Template.bind({});
WithDropdown.args = {
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
};

export const WithDropdownAndFooter = Template.bind({});
WithDropdownAndFooter.args = {
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
