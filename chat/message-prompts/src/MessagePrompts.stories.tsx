import React, { useState } from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { MessagePrompt, MessagePrompts } from '.';

export default {
  title: 'Chat/MessagePrompts',
  component: MessagePrompts,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};

export const Basic: StoryFn<typeof MessagePrompts> = args => {
  const [selected, setSelected] = useState<number | undefined>();
  return (
    <MessagePrompts {...args}>
      <MessagePrompt selected={selected === 0} onClick={() => setSelected(0)}>
        How does this look?
      </MessagePrompt>
      <MessagePrompt selected={selected === 1} onClick={() => setSelected(1)}>
        This is a longer prompt. How does THIS look?
      </MessagePrompt>
    </MessagePrompts>
  );
};

export const WithLabel = Basic.bind({});
WithLabel.args = {
  label: 'Suggested Prompts',
};

export const Selected: StoryFn<typeof MessagePrompts> = args => {
  return (
    <MessagePrompts {...args}>
      <MessagePrompt
        onClick={e => {
          // eslint-disable-next-line no-console
          console.log(e);
        }}
      >
        How does this look?
      </MessagePrompt>
      <MessagePrompt selected>
        This is a longer prompt. How does THIS look?
      </MessagePrompt>
    </MessagePrompts>
  );
};
