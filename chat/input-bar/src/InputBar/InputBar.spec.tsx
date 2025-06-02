import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { transitionDuration } from '@leafygreen-ui/tokens';

import { InputBar } from '.';

const testText = 'test';

describe('packages/input-bar', () => {
  test('onChange is fired when user types', () => {
    const onChange = jest.fn();
    render(<InputBar onChange={onChange} />);

    const textarea = screen.getByRole('textbox');
    userEvent.type(textarea, testText);

    expect(onChange).toHaveBeenCalledTimes(testText.length);
  });

  test('onMessageSend is fired when enter is clicked', () => {
    const onMessageSend = jest.fn();
    render(<InputBar onMessageSend={onMessageSend} />);

    const textarea = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button');
    userEvent.type(textarea, testText);
    userEvent.click(sendButton);

    expect(onMessageSend).toHaveBeenCalled();
    expect(onMessageSend).toHaveBeenCalledWith(
      testText,
      expect.objectContaining({
        type: 'submit',
      }),
    );
  });

  test('onMessageSend is fired when enter key is pressed', () => {
    const onMessageSend = jest.fn();
    render(<InputBar onMessageSend={onMessageSend} />);

    const textarea = screen.getByRole('textbox');
    userEvent.type(textarea, testText);
    userEvent.type(textarea, '{enter}');

    expect(onMessageSend).toHaveBeenCalled();
    expect(onMessageSend).toHaveBeenCalledWith(
      testText,
      expect.objectContaining({
        type: 'submit',
      }),
    );
  });

  test('onSubmit is fired when enter is clicked', () => {
    const onSubmit = jest.fn();
    render(<InputBar onSubmit={onSubmit} />);

    const textarea = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button');
    userEvent.type(textarea, testText);
    userEvent.click(sendButton);

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'submit',
      }),
    );
  });

  test('onSubmit is fired when enter key is pressed', () => {
    const onSubmit = jest.fn();
    render(<InputBar onSubmit={onSubmit} />);

    const textarea = screen.getByRole('textbox');
    userEvent.type(textarea, testText);
    userEvent.type(textarea, '{enter}');

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'submit',
      }),
    );
  });

  test('badgeText is rendered when the prop is set', () => {
    render(<InputBar badgeText="beta" />);

    expect(screen.getByText('beta')).toBeInTheDocument();
  });

  test('Hotkey Indicator is rendered when the prop is set', () => {
    render(<InputBar shouldRenderHotkeyIndicator />);

    expect(screen.getByTestId('lg-chat-hotkey-indicator')).toBeInTheDocument();
  });

  test('Hotkey Indicator is hidden when InputBar is focused and visible when unfocused', async () => {
    render(<InputBar shouldRenderHotkeyIndicator />);
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

  test('When the hotkey indicator is enabled, pressing the hotkey focuses the input', async () => {
    render(<InputBar shouldRenderHotkeyIndicator />);

    userEvent.keyboard('/');
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveFocus();
  });

  test('InputBar preserves controlled value after form submission', () => {
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

  test('InputBar handles textareaProps.onChange correctly', () => {
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
