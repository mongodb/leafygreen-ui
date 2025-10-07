import React, { useRef } from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { transitionDuration } from '@leafygreen-ui/tokens';

import { State } from '../shared.types';

import { InputBar, InputBarProps } from '.';

const TEST_INPUT_TEXT = 'test';

const renderInputBar = (
  props: Partial<InputBarProps> = {},
  variant: Variant = Variant.Compact,
) => {
  return render(
    <LeafyGreenChatProvider variant={variant}>
      <InputBar {...props} />
    </LeafyGreenChatProvider>,
  );
};

describe('packages/input-bar', () => {
  // mock the ResizeObserver used in LeafyGreenChatProvider
  beforeAll(() => {
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  test('renders `badgeText` when the prop is set', () => {
    renderInputBar({ badgeText: 'beta' }, Variant.Spacious);

    expect(screen.getByText('beta')).toBeInTheDocument();
  });

  test('fires `onChange` when user types', () => {
    const onChange = jest.fn();
    renderInputBar({ onChange });

    const textarea = screen.getByRole('textbox');
    userEvent.type(textarea, TEST_INPUT_TEXT);

    expect(onChange).toHaveBeenCalledTimes(TEST_INPUT_TEXT.length);
  });

  describe('onMessageSend', () => {
    const onMessageSend = jest.fn();
    beforeEach(() => {
      onMessageSend.mockClear();
      renderInputBar({ onMessageSend });
    });

    test('fires when enter is clicked', () => {
      const textarea = screen.getByRole('textbox');
      const sendButton = screen.getByRole('button');
      userEvent.type(textarea, TEST_INPUT_TEXT);
      userEvent.click(sendButton);

      expect(onMessageSend).toHaveBeenCalledTimes(1);
      expect(onMessageSend).toHaveBeenCalledWith(
        TEST_INPUT_TEXT,
        expect.objectContaining({
          type: 'submit',
        }),
      );
    });

    test('fires when enter key is pressed', () => {
      const textarea = screen.getByRole('textbox');
      userEvent.type(textarea, TEST_INPUT_TEXT);
      userEvent.type(textarea, '{enter}');

      expect(onMessageSend).toHaveBeenCalledTimes(1);
      expect(onMessageSend).toHaveBeenCalledWith(
        TEST_INPUT_TEXT,
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
      renderInputBar({ onSubmit });
    });

    test('fires when enter is clicked', () => {
      const textarea = screen.getByRole('textbox');
      const sendButton = screen.getByRole('button');
      userEvent.type(textarea, TEST_INPUT_TEXT);
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
      userEvent.type(textarea, TEST_INPUT_TEXT);
      userEvent.type(textarea, '{enter}');

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'submit',
        }),
      );
    });
  });

  test('disables the textarea and send button when `disabled` is true', () => {
    renderInputBar({ disabled: true });
    const textarea = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button');
    expect(textarea).toBeDisabled();
    expect(sendButton).toHaveAttribute('aria-disabled', 'true');
  });

  test('disables only the send button when `disableSend` is true', () => {
    renderInputBar({ disableSend: true });
    const textarea = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button');
    expect(textarea).not.toBeDisabled();
    expect(sendButton).toHaveAttribute('aria-disabled', 'true');
  });

  test('disables the send button when whitespace is entered as a value', () => {
    renderInputBar();
    const textarea = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button');

    // Initially the send button should be disabled (empty input)
    expect(sendButton).toHaveAttribute('aria-disabled', 'true');

    // Type whitespace characters
    userEvent.type(textarea, '   \n\t  ');

    // Send button should remain disabled
    expect(sendButton).toHaveAttribute('aria-disabled', 'true');
  });

  test('provides access to textarea element via textareaRef', () => {
    const TestComponent = () => {
      const textareaRef = useRef<HTMLTextAreaElement | null>(null);

      const handleClick = () => {
        if (textareaRef.current) {
          // Focus the textarea to verify ref access
          textareaRef.current.focus();
        }
      };

      return (
        <div>
          <button onClick={handleClick} data-testid="ref-button">
            Focus via ref
          </button>
          <InputBar textareaRef={textareaRef} />
        </div>
      );
    };

    render(<TestComponent />);

    const textarea = screen.getByRole('textbox');
    const refButton = screen.getByTestId('ref-button');

    // Initially not focused
    expect(textarea).not.toHaveFocus();

    // Click button to focus via ref
    userEvent.click(refButton);

    // Textarea should be focused via ref
    expect(textarea).toHaveFocus();
  });

  describe('Hotkey Indicator', () => {
    beforeEach(() => {
      renderInputBar({ shouldRenderHotkeyIndicator: true }, Variant.Spacious);
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

      renderInputBar({ onMessageSend });

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

      renderInputBar({
        textareaProps: { value: controlledValue },
        onMessageSend,
      });

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

      renderInputBar({
        textareaProps: {
          value: 'initial',
          onChange: onTextareaChange,
        },
      });

      const textarea = screen.getByRole('textbox');
      userEvent.type(textarea, 'x');

      // The onChange handler should be called when typing
      expect(onTextareaChange).toHaveBeenCalled();
    });
  });

  describe('status states', () => {
    test('renders loading state with default assistantName when state is "loading"', () => {
      renderInputBar({ state: State.Loading });

      expect(
        screen.getByText(/MongoDB Assistant is thinking/i),
      ).toBeInTheDocument();
    });

    test('renders loading state with custom assistantName when state is "loading"', () => {
      render(
        <LeafyGreenChatProvider
          variant={Variant.Compact}
          assistantName="Custom Assistant"
        >
          <InputBar state={State.Loading} />
        </LeafyGreenChatProvider>,
      );

      expect(
        screen.getByText(/Custom Assistant is thinking/i),
      ).toBeInTheDocument();
    });

    test('renders error state with default message when state is "error" and no message provided', () => {
      renderInputBar({ state: State.Error });

      expect(
        screen.getByText(/Oops... Something went wrong/i),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /retry/i }),
      ).toBeInTheDocument();
    });

    test('renders error state with custom message when state is "error" and errorMessage provided', () => {
      const errorMessage = 'Custom error message';
      renderInputBar({ state: State.Error, errorMessage });

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /retry/i }),
      ).toBeInTheDocument();
    });

    test('retry button calls onMessageSend', () => {
      const onMessageSend = jest.fn();
      const { rerender } = renderInputBar({
        onMessageSend,
        textareaProps: { value: TEST_INPUT_TEXT },
      });

      const sendButton = screen.getByRole('button', { name: 'Send message' });
      userEvent.click(sendButton);
      expect(onMessageSend).toHaveBeenCalledWith(
        TEST_INPUT_TEXT,
        expect.objectContaining({
          type: 'submit',
        }),
      );

      rerender(
        <LeafyGreenChatProvider variant={Variant.Compact}>
          <InputBar
            state={State.Error}
            onMessageSend={onMessageSend}
            textareaProps={{ value: TEST_INPUT_TEXT }}
          />
        </LeafyGreenChatProvider>,
      );

      const retryButton = screen.getByRole('button', { name: /retry/i });
      userEvent.click(retryButton);

      expect(onMessageSend).toHaveBeenCalledWith(
        TEST_INPUT_TEXT,
        expect.objectContaining({
          type: 'submit',
        }),
      );
    });
  });

  describe('onClickStop', () => {
    test('enables send button during loading state even with empty message', () => {
      renderInputBar({ state: State.Loading });

      const sendButton = screen.getByRole('button', { name: 'Send message' });
      expect(sendButton).not.toHaveAttribute('aria-disabled', 'true');
    });

    test('calls onClickStop when button is clicked during loading state', () => {
      const onClickStop = jest.fn();
      renderInputBar({ state: State.Loading, onClickStop });

      const sendButton = screen.getByRole('button', { name: 'Send message' });
      userEvent.click(sendButton);

      expect(onClickStop).toHaveBeenCalledTimes(1);
    });

    test('restores previous message when stop is clicked in uncontrolled mode', () => {
      const onClickStop = jest.fn();
      const onMessageSend = jest.fn();
      const { rerender } = renderInputBar({ onClickStop, onMessageSend });

      const textarea = screen.getByRole('textbox');
      let sendButton = screen.getByRole('button', { name: 'Send message' });

      userEvent.type(textarea, TEST_INPUT_TEXT);
      expect(textarea).toHaveValue(TEST_INPUT_TEXT);

      userEvent.click(sendButton);
      expect(onMessageSend).toHaveBeenCalledTimes(1);
      expect(textarea).toHaveValue('');

      rerender(
        <LeafyGreenChatProvider variant={Variant.Compact}>
          <InputBar
            state={State.Loading}
            onClickStop={onClickStop}
            onMessageSend={onMessageSend}
          />
        </LeafyGreenChatProvider>,
      );

      sendButton = screen.getByRole('button', { name: 'Send message' });

      userEvent.click(sendButton);

      expect(onClickStop).toHaveBeenCalledTimes(1);
      expect(textarea).toHaveValue(TEST_INPUT_TEXT);
    });

    test('does not call onMessageSend when stopping during loading state', () => {
      const onMessageSend = jest.fn();
      const onClickStop = jest.fn();

      renderInputBar({
        state: State.Loading,
        onMessageSend,
        onClickStop,
        textareaProps: { value: TEST_INPUT_TEXT },
      });

      const sendButton = screen.getByRole('button', { name: 'Send message' });
      userEvent.click(sendButton);

      expect(onClickStop).toHaveBeenCalledTimes(1);
      expect(onMessageSend).not.toHaveBeenCalled();
    });

    test('disabled prop takes precedence over loading state', () => {
      const onClickStop = jest.fn();
      renderInputBar({ state: State.Loading, disabled: true, onClickStop });

      const sendButton = screen.getByRole('button', { name: 'Send message' });
      expect(sendButton).toHaveAttribute('aria-disabled', 'true');
    });

    test('disableSend prop takes precedence over loading state', () => {
      const onClickStop = jest.fn();
      renderInputBar({ state: State.Loading, disableSend: true, onClickStop });

      const sendButton = screen.getByRole('button', { name: 'Send message' });
      expect(sendButton).toHaveAttribute('aria-disabled', 'true');
    });

    test('does not call onClickStop if not in loading state', () => {
      const onClickStop = jest.fn();
      const onMessageSend = jest.fn();

      renderInputBar({
        onClickStop,
        onMessageSend,
        textareaProps: { value: TEST_INPUT_TEXT },
      });

      const sendButton = screen.getByRole('button', { name: 'Send message' });
      userEvent.click(sendButton);

      expect(onClickStop).not.toHaveBeenCalled();
      expect(onMessageSend).toHaveBeenCalledTimes(1);
    });
  });
});
