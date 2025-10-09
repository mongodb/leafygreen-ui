import React, { useState } from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';

import { MessagePrompt, MessagePrompts, MessagePromptsProps } from '.';

// eslint-disable-next-line no-console
const testOnClickRefresh = () => console.log('Refresh clicked');

const meta: StoryMetaType<typeof MessagePrompts> = {
  title: 'Composition/Chat/MessagePrompts',
  component: MessagePrompts,
  args: {
    label: 'Suggested Prompts',
    onClickRefresh: testOnClickRefresh,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    enableHideOnSelect: { control: 'boolean' },
    label: { control: 'text' },
  },
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'onClickRefresh'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        label: [undefined, 'Suggested Prompts'],
        onClickRefresh: [undefined, testOnClickRefresh],
      },
      excludeCombinations: [
        {
          label: undefined,
          onClickRefresh: testOnClickRefresh,
        },
      ],
    },
  },
};
export default meta;

const Template: StoryFn<MessagePromptsProps> = args => {
  const [selected, setSelected] = useState<number | undefined>();
  return (
    <MessagePrompts {...args}>
      <MessagePrompt
        selected={selected === 0}
        onClick={() => setSelected(0)}
        data-testid="prompt-0"
      >
        How does this look?
      </MessagePrompt>
      <MessagePrompt
        selected={selected === 1}
        onClick={() => setSelected(1)}
        data-testid="prompt-1"
      >
        This is a longer prompt. How does THIS look?
      </MessagePrompt>
      <MessagePrompt
        selected={selected === 2}
        onClick={() => setSelected(2)}
        data-testid="prompt-2"
      >
        Can you explain this feature?
      </MessagePrompt>
    </MessagePrompts>
  );
};

export const LiveExample: StoryObj<MessagePromptsProps> = {
  render: Template,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const SelectedWithoutHideOnSelect: StoryObj<MessagePromptsProps> = {
  render: Template,
  args: {
    enableHideOnSelect: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click first prompt
    const firstPrompt = canvas.getByTestId('prompt-0');
    await userEvent.click(firstPrompt);

    // Verify prompt is selected
    expect(firstPrompt).toHaveAttribute('aria-pressed', 'true');

    // Verify other prompts are disabled
    const secondPrompt = canvas.getByTestId('prompt-1');
    expect(secondPrompt).toHaveAttribute('aria-disabled', 'true');
  },
  parameters: {
    chromatic: {
      delay: 300,
    },
  },
};

export const SelectedWithHideOnSelect: StoryObj<MessagePromptsProps> = {
  render: Template,
  args: {
    enableHideOnSelect: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click first prompt
    const firstPrompt = canvas.getByTestId('prompt-0');
    await userEvent.click(firstPrompt);

    // Verify prompt is selected
    expect(firstPrompt).toHaveAttribute('aria-pressed', 'true');

    // After selection with enableHideOnSelect, prompts should not be visible
    await waitFor(() => expect(firstPrompt).not.toBeVisible());
  },
  parameters: {
    chromatic: {
      delay: 400, // Wait for transition to complete
    },
  },
};

export const Generated: StoryObj<MessagePromptsProps> = {
  render: Template,
  args: {
    children: (
      <>
        <MessagePrompt>How does this look?</MessagePrompt>
        <MessagePrompt>
          This is a longer prompt. How does THIS look?
        </MessagePrompt>
        <MessagePrompt>Can you explain this feature?</MessagePrompt>
      </>
    ),
  },
};
