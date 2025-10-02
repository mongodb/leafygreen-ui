import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { MessagePrompts } from '../MessagePrompts';

import { MessagePrompt, type MessagePromptProps } from '.';

const defaultProps: MessagePromptProps = {
  children: 'What is MongoDB?',
};

const renderMessagePrompt = (props: Partial<MessagePromptProps> = {}) => {
  return render(
    <MessagePrompt data-testid="message-prompt" {...defaultProps} {...props} />,
  );
};

const renderMessagePromptInGroup = (
  props: Partial<MessagePromptProps> = {},
) => {
  return render(
    <MessagePrompts>
      <MessagePrompt data-testid="message-prompt" {...defaultProps} {...props}>
        {props.children || defaultProps.children}
      </MessagePrompt>
      <MessagePrompt>Another prompt</MessagePrompt>
    </MessagePrompts>,
  );
};

describe('MessagePrompt', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderMessagePrompt();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('has correct aria attributes when disabled', () => {
      renderMessagePrompt({ disabled: true });
      const button = screen.getByTestId('message-prompt');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    test('has correct aria attributes when selected', () => {
      renderMessagePrompt({ selected: true });
      const button = screen.getByTestId('message-prompt');
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('rendering', () => {
    test('renders children text', () => {
      const text = 'How do I query MongoDB?';
      renderMessagePrompt({ children: text });
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    test('applies custom className', () => {
      const customClass = 'custom-class';
      renderMessagePrompt({ className: customClass });
      const button = screen.getByTestId('message-prompt');
      expect(button).toHaveClass(customClass);
    });
  });

  describe('onClick behavior', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    test('calls onClick when clicked', async () => {
      const mockOnClick = jest.fn();

      renderMessagePrompt({
        onClick: mockOnClick,
      });

      const button = screen.getByTestId('message-prompt');
      await userEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'click',
        }),
      );
    });

    test('does not call onClick when disabled', async () => {
      const mockOnClick = jest.fn();

      renderMessagePrompt({
        disabled: true,
        onClick: mockOnClick,
      });

      const button = screen.getByTestId('message-prompt');
      await userEvent.click(button);

      expect(mockOnClick).not.toHaveBeenCalled();
    });

    test('does not call onClick when another prompt is selected in group', async () => {
      const mockOnClick = jest.fn();

      render(
        <MessagePrompts>
          <MessagePrompt selected>Selected prompt</MessagePrompt>
          <MessagePrompt data-testid="message-prompt" onClick={mockOnClick}>
            Unselected prompt
          </MessagePrompt>
        </MessagePrompts>,
      );

      const button = screen.getByTestId('message-prompt');

      // Button should be disabled and not clickable due to pointer-events
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe('selected state', () => {
    test('can be selected', () => {
      renderMessagePrompt({ selected: true });
      const button = screen.getByTestId('message-prompt');
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    test('when selected in a group, other prompts are disabled', () => {
      render(
        <MessagePrompts>
          <MessagePrompt data-testid="selected-prompt" selected>
            Selected
          </MessagePrompt>
          <MessagePrompt data-testid="other-prompt">Not selected</MessagePrompt>
        </MessagePrompts>,
      );

      const selectedButton = screen.getByTestId('selected-prompt');
      const otherButton = screen.getByTestId('other-prompt');

      expect(selectedButton).toHaveAttribute('aria-pressed', 'true');
      expect(selectedButton).toHaveAttribute('aria-disabled', 'false');
      expect(otherButton).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('disabled state', () => {
    test('can be explicitly disabled', () => {
      renderMessagePrompt({ disabled: true });
      const button = screen.getByTestId('message-prompt');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    test('explicit disabled prop overrides selection state', () => {
      const mockOnClick = jest.fn();

      renderMessagePromptInGroup({
        disabled: true,
        selected: true,
        onClick: mockOnClick,
      });

      const button = screen.getByTestId('message-prompt');

      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });
});
