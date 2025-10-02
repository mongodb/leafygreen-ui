import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { MessagePrompt } from '../MessagePrompt';

import { MessagePrompts, type MessagePromptsProps } from '.';

const defaultProps: MessagePromptsProps = {
  children: (
    <>
      <MessagePrompt>What is MongoDB?</MessagePrompt>
      <MessagePrompt>How do I query MongoDB?</MessagePrompt>
    </>
  ),
};

const renderMessagePrompts = (props: Partial<MessagePromptsProps> = {}) => {
  return render(<MessagePrompts {...defaultProps} {...props} />);
};

describe('MessagePrompts', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderMessagePrompts();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    test('renders children prompts', () => {
      renderMessagePrompts();
      expect(screen.getByText('What is MongoDB?')).toBeInTheDocument();
      expect(screen.getByText('How do I query MongoDB?')).toBeInTheDocument();
    });

    test('renders optional label when provided', () => {
      const label = 'Suggested Prompts';
      renderMessagePrompts({ label });
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    test('does not render label when not provided', () => {
      const { container } = renderMessagePrompts();
      // Container should only have the prompts div, not a label
      const labels = container.querySelectorAll('p');
      // Only the Body elements inside MessagePrompt buttons should exist
      expect(labels.length).toBe(2); // One for each prompt
    });
  });

  describe('enableHideOnSelect behavior', () => {
    test('does not hide prompts when enableHideOnSelect is false (default)', () => {
      render(
        <MessagePrompts enableHideOnSelect={false}>
          <MessagePrompt selected>Selected prompt</MessagePrompt>
          <MessagePrompt data-testid="unselected-prompt">
            Unselected prompt
          </MessagePrompt>
        </MessagePrompts>,
      );

      const unselectedButton = screen.getByTestId('unselected-prompt');

      // Button should still be disabled, but container should be visible
      expect(unselectedButton).toHaveAttribute('aria-disabled', 'true');
      expect(unselectedButton).toBeVisible();
    });

    test('hides prompts when enableHideOnSelect is true and a prompt is selected', () => {
      render(
        <MessagePrompts enableHideOnSelect={true}>
          <MessagePrompt selected>Selected prompt</MessagePrompt>
          <MessagePrompt data-testid="unselected-prompt">
            Unselected prompt
          </MessagePrompt>
        </MessagePrompts>,
      );

      // Both prompts should not be visible when a prompt is selected and hide is enabled
      expect(screen.queryByText('Selected prompt')).not.toBeVisible();
      expect(screen.queryByTestId('unselected-prompt')).not.toBeVisible();
    });

    test('does not hide prompts when enableHideOnSelect is true but no prompt is selected', () => {
      render(
        <MessagePrompts enableHideOnSelect={true}>
          <MessagePrompt data-testid="prompt-1">Prompt 1</MessagePrompt>
          <MessagePrompt data-testid="prompt-2">Prompt 2</MessagePrompt>
        </MessagePrompts>,
      );

      const prompt1 = screen.getByTestId('prompt-1');
      const prompt2 = screen.getByTestId('prompt-2');

      // Both prompts should be visible and interactable
      expect(prompt1).toBeVisible();
      expect(prompt2).toBeVisible();
      expect(prompt1).toHaveAttribute('aria-disabled', 'false');
      expect(prompt2).toHaveAttribute('aria-disabled', 'false');
    });
  });

  describe('hasSelectedPrompt context', () => {
    test('passes hasSelectedPrompt=true when a prompt is selected', () => {
      render(
        <MessagePrompts>
          <MessagePrompt selected data-testid="selected-prompt">
            Selected
          </MessagePrompt>
          <MessagePrompt data-testid="other-prompt">Not selected</MessagePrompt>
        </MessagePrompts>,
      );

      const selectedButton = screen.getByTestId('selected-prompt');
      const otherButton = screen.getByTestId('other-prompt');

      // Selected prompt should be enabled, others should be disabled
      expect(selectedButton).toHaveAttribute('aria-pressed', 'true');
      expect(selectedButton).toHaveAttribute('aria-disabled', 'false');
      expect(otherButton).toHaveAttribute('aria-disabled', 'true');
    });

    test('passes hasSelectedPrompt=false when no prompt is selected', () => {
      render(
        <MessagePrompts>
          <MessagePrompt data-testid="prompt-1">Prompt 1</MessagePrompt>
          <MessagePrompt data-testid="prompt-2">Prompt 2</MessagePrompt>
        </MessagePrompts>,
      );

      const prompt1 = screen.getByTestId('prompt-1');
      const prompt2 = screen.getByTestId('prompt-2');

      // All prompts should be enabled when none are selected
      expect(prompt1).toHaveAttribute('aria-disabled', 'false');
      expect(prompt2).toHaveAttribute('aria-disabled', 'false');
    });
  });
});
