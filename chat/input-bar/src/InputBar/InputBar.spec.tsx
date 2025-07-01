import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { transitionDuration } from '@leafygreen-ui/tokens';

import { InputBar } from '.';

const testText = 'test';

describe('packages/input-bar', () => {
  test('renders `badgeText` when the prop is set', () => {
    render(<InputBar badgeText="beta" />);

    expect(screen.getByText('beta')).toBeInTheDocument();
  });

  test('fires `onChange` when user types', () => {
    const onChange = jest.fn();
    render(<InputBar onChange={onChange} />);

    const textarea = screen.getByRole('textbox');
    userEvent.type(textarea, testText);

    expect(onChange).toHaveBeenCalledTimes(testText.length);
  });

  describe('onMessageSend', () => {
    const onMessageSend = jest.fn();
    beforeEach(() => {
      onMessageSend.mockClear();
      render(<InputBar onMessageSend={onMessageSend} />);
    });

    test('fires when enter is clicked', () => {
      const textarea = screen.getByRole('textbox');
      const sendButton = screen.getByRole('button');
      userEvent.type(textarea, testText);
      userEvent.click(sendButton);

      expect(onMessageSend).toHaveBeenCalledTimes(1);
      expect(onMessageSend).toHaveBeenCalledWith(
        testText,
        expect.objectContaining({
          type: 'submit',
        }),
      );
    });

    test('fires when enter key is pressed', () => {
      const textarea = screen.getByRole('textbox');
      userEvent.type(textarea, testText);
      userEvent.type(textarea, '{enter}');

      expect(onMessageSend).toHaveBeenCalledTimes(1);
      expect(onMessageSend).toHaveBeenCalledWith(
        testText,
        expect.objectContaining({
          type: 'submit',
        }),
      );
    });
  });

  describe('onSubmit', () => {
    const onSubmit = jest.fn();
    beforeEach(() => {
      onSubmit.mockClear();
      render(<InputBar onSubmit={onSubmit} />);
    });

    test('fires when enter is clicked', () => {
      const textarea = screen.getByRole('textbox');
      const sendButton = screen.getByTitle('Send message');
      userEvent.type(textarea, testText);
      userEvent.click(sendButton);

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'submit',
        }),
      );
    });

    test('fires when enter key is pressed', () => {
      const textarea = screen.getByRole('textbox');
      userEvent.type(textarea, testText);
      userEvent.type(textarea, '{enter}');

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'submit',
        }),
      );
    });
  });

  describe('Hotkey Indicator', () => {
    beforeEach(() => {
      render(<InputBar shouldRenderHotkeyIndicator />);
    });

    test('renders when the prop is set', () => {
      expect(
        screen.getByTestId('lg-chat-hotkey-indicator'),
      ).toBeInTheDocument();
    });

    test('is hidden when InputBar is focused and visible when unfocused', async () => {
      const textarea = screen.getByRole('textbox');

      act(() => {
        textarea.focus();
      });
      // Wait for CSS animation
      await new Promise(resolve =>
        setTimeout(resolve, transitionDuration.default),
      );

      expect(screen.getByTestId('lg-chat-hotkey-indicator')).not.toBeVisible();

      act(() => {
        textarea.blur();
      });
      // Wait for CSS animation
      await new Promise(resolve =>
        setTimeout(resolve, transitionDuration.default),
      );
      expect(screen.getByTestId('lg-chat-hotkey-indicator')).toBeVisible();
    });

    test('focuses the input when the hotkey indicator is enabled and hotkey is pressed', async () => {
      userEvent.keyboard('/');
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveFocus();
    });
  });

  describe('controlled vs uncontrolled behavior', () => {
    test('resets value to empty string after form submission when uncontrolled', () => {
      const onMessageSend = jest.fn();

      render(<InputBar onMessageSend={onMessageSend} />);

      const textarea = screen.getByRole('textbox');
      const sendButton = screen.getByRole('button');

      // Type text in the textarea
      userEvent.type(textarea, 'message to be cleared');
      expect(textarea).toHaveValue('message to be cleared');

      // Submit the form
      userEvent.click(sendButton);

      // Check that the textarea is empty after submission
      expect(textarea).toHaveValue('');

      // Verify onMessageSend was called with the correct message
      expect(onMessageSend).toHaveBeenCalledWith(
        'message to be cleared',
        expect.objectContaining({
          type: 'submit',
        }),
      );
    });

    test('preserves value after form submission when controlled', () => {
      const onMessageSend = jest.fn();
      const controlledValue = 'persistent text';

      render(
        <InputBar
          textareaProps={{ value: controlledValue }}
          onMessageSend={onMessageSend}
        />,
      );

      const textarea = screen.getByRole('textbox');
      const sendButton = screen.getByRole('button');

      expect(textarea).toHaveValue(controlledValue);
      userEvent.click(sendButton);

      // The value should remain unchanged after submission in controlled mode
      expect(textarea).toHaveValue(controlledValue);
      expect(onMessageSend).toHaveBeenCalledWith(
        controlledValue,
        expect.objectContaining({
          type: 'submit',
        }),
      );
    });

    test('handles textareaProps.onChange correctly', () => {
      const onTextareaChange = jest.fn();

      render(
        <InputBar
          textareaProps={{
            value: 'initial',
            onChange: onTextareaChange,
          }}
        />,
      );

      const textarea = screen.getByRole('textbox');
      userEvent.type(textarea, 'x');

      // The onChange handler should be called when typing
      expect(onTextareaChange).toHaveBeenCalled();
    });
  });
});
