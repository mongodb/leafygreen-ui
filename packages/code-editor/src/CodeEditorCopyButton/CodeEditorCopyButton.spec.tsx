import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CodeEditorCopyButton } from './CodeEditorCopyButton';
import { CopyButtonVariant } from './CodeEditorCopyButton.types';
import { COPIED_SUCCESS_DURATION, COPIED_TEXT, COPY_TEXT } from './constants';

// Mock the clipboard API
const mockWriteText = jest.fn();
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
});

// Mock document.execCommand for fallback testing
const mockExecCommand = jest.fn();
Object.assign(document, {
  execCommand: mockExecCommand,
});

// Mock window.isSecureContext
Object.defineProperty(window, 'isSecureContext', {
  writable: true,
  value: true,
});

describe('CodeEditorCopyButton', () => {
  const mockGetContents = jest.fn(() => 'test content');
  const mockOnCopy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useFakeTimers();
    mockWriteText.mockResolvedValue(undefined);
    mockExecCommand.mockReturnValue(true);
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    test('renders as Button variant by default', () => {
      render(
        <CodeEditorCopyButton
          getContents={mockGetContents}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', COPY_TEXT);
    });

    test('renders as IconButton when variant is IconButton', () => {
      render(
        <CodeEditorCopyButton
          getContents={mockGetContents}
          onCopy={mockOnCopy}
          variant={CopyButtonVariant.IconButton}
        />,
      );

      const button = screen.getByRole('button', { name: 'Copy text' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', 'Copy text');
    });

    test('renders with custom className', () => {
      render(
        <CodeEditorCopyButton
          getContents={mockGetContents}
          onCopy={mockOnCopy}
          className="custom-class"
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      expect(button).toHaveClass('custom-class');
    });

    test('renders as disabled when disabled prop is true', () => {
      render(
        <CodeEditorCopyButton
          getContents={mockGetContents}
          onCopy={mockOnCopy}
          disabled={true}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Tooltip behavior', () => {
    test('shows copy text in tooltip by default', async () => {
      render(
        <CodeEditorCopyButton
          getContents={mockGetContents}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });

      await act(async () => {
        await userEvent.hover(button);
      });

      await waitFor(() => {
        expect(screen.getByText(COPY_TEXT)).toBeInTheDocument();
      });
    });

    test('shows copied text in tooltip after successful copy', async () => {
      render(
        <CodeEditorCopyButton
          getContents={mockGetContents}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });

      await act(async () => {
        await userEvent.click(button);
        await userEvent.hover(button);
      });

      await waitFor(() => {
        expect(screen.getAllByText(COPIED_TEXT)[0]).toBeInTheDocument();
      });
    });
  });

  describe('Copy functionality', () => {
    test('calls getContents and clipboard API on click', async () => {
      render(
        <CodeEditorCopyButton
          getContents={mockGetContents}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });

      await act(async () => {
        await userEvent.click(button);
      });

      await waitFor(() => {
        expect(mockGetContents).toHaveBeenCalledTimes(1);
        expect(mockWriteText).toHaveBeenCalledWith('test content');
        expect(mockOnCopy).toHaveBeenCalledTimes(1);
      });
    });

    test('falls back to execCommand when clipboard API is not available', async () => {
      // Mock clipboard API as unavailable
      Object.assign(navigator, { clipboard: undefined });

      render(
        <CodeEditorCopyButton
          getContents={mockGetContents}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      await act(async () => {
        await userEvent.click(button);
      });

      expect(mockGetContents).toHaveBeenCalledTimes(1);
      expect(mockExecCommand).toHaveBeenCalledWith('copy');
      expect(mockOnCopy).toHaveBeenCalledTimes(1);

      // Restore clipboard API for other tests
      Object.assign(navigator, {
        clipboard: { writeText: mockWriteText },
      });
    });

    test('falls back to execCommand in non-secure context', async () => {
      // Mock non-secure context
      Object.defineProperty(window, 'isSecureContext', { value: false });

      render(
        <CodeEditorCopyButton
          getContents={mockGetContents}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      await act(async () => {
        await userEvent.click(button);
      });

      expect(mockGetContents).toHaveBeenCalledTimes(1);
      expect(mockExecCommand).toHaveBeenCalledWith('copy');
      expect(mockOnCopy).toHaveBeenCalledTimes(1);

      // Restore secure context for other tests
      Object.defineProperty(window, 'isSecureContext', { value: true });
    });

    test('handles clipboard API errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockWriteText.mockRejectedValue(new Error('Clipboard error'));

      render(
        <CodeEditorCopyButton
          getContents={mockGetContents}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      await act(async () => {
        await userEvent.click(button);
      });

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          'Failed to copy text: ',
          expect.any(Error),
        );
        expect(mockOnCopy).toHaveBeenCalledTimes(1);
      });

      consoleSpy.mockRestore();
    });

    test('works without onCopy callback', async () => {
      render(<CodeEditorCopyButton getContents={mockGetContents} />);

      const button = screen.getByRole('button', { name: COPY_TEXT });
      await act(async () => {
        await userEvent.click(button);
      });

      expect(mockGetContents).toHaveBeenCalledTimes(1);
      expect(mockWriteText).toHaveBeenCalledWith('test content');
    });
  });

  describe('Visual feedback', () => {
    test('shows checkmark icon after successful copy', async () => {
      render(
        <CodeEditorCopyButton
          getContents={mockGetContents}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      await act(async () => {
        await userEvent.click(button);
      });
      // Should show checkmark icon and screen reader text
      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(COPIED_TEXT);
      });
    });

    test('resets to copy icon after timeout', async () => {
      render(
        <CodeEditorCopyButton
          getContents={mockGetContents}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      await act(async () => {
        await userEvent.click(button);
      });

      // Should show copied state
      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(COPIED_TEXT);
      });

      // Fast-forward past the timeout
      act(() => {
        jest.advanceTimersByTime(COPIED_SUCCESS_DURATION);
      });

      // Should no longer show the alert
      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      });
    });
  });

  describe('Keyboard interactions', () => {
    test('triggers copy on Enter key', async () => {
      render(
        <CodeEditorCopyButton
          getContents={mockGetContents}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      await act(async () => {
        button.focus();
        await userEvent.keyboard('{Enter}');
      });

      await waitFor(() => {
        expect(mockGetContents).toHaveBeenCalledTimes(1);
        expect(mockWriteText).toHaveBeenCalledWith('test content');
        expect(mockOnCopy).toHaveBeenCalledTimes(1);
      });
    });

    test('triggers copy on Space key', async () => {
      render(
        <CodeEditorCopyButton
          getContents={mockGetContents}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      await act(async () => {
        button.focus();
        await userEvent.keyboard(' ');
      });

      await waitFor(() => {
        expect(mockGetContents).toHaveBeenCalledTimes(1);
        expect(mockWriteText).toHaveBeenCalledWith('test content');
        expect(mockOnCopy).toHaveBeenCalledTimes(1);
      });
    });

    test('does not trigger copy on Escape key', async () => {
      render(
        <CodeEditorCopyButton
          getContents={mockGetContents}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      await act(async () => {
        button.focus();
        await userEvent.keyboard('{Escape}');
      });

      expect(mockGetContents).not.toHaveBeenCalled();
      expect(mockWriteText).not.toHaveBeenCalled();
      expect(mockOnCopy).not.toHaveBeenCalled();
    });

    test('does not trigger copy on Tab key', async () => {
      render(
        <CodeEditorCopyButton
          getContents={mockGetContents}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      await act(async () => {
        button.focus();
        await userEvent.keyboard('{Tab}');
      });

      expect(mockGetContents).not.toHaveBeenCalled();
      expect(mockWriteText).not.toHaveBeenCalled();
      expect(mockOnCopy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('has proper aria-label', () => {
      render(
        <CodeEditorCopyButton
          getContents={mockGetContents}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      expect(button).toHaveAttribute('aria-label', COPY_TEXT);
    });

    test('announces copy success to screen readers', async () => {
      render(
        <CodeEditorCopyButton
          getContents={mockGetContents}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      await act(async () => {
        await userEvent.click(button);
      });

      await waitFor(() => {
        const alert = screen.getByRole('alert');
        expect(alert).toHaveTextContent(COPIED_TEXT);
      });
    });

    test('is focusable and keyboard accessible', () => {
      render(
        <CodeEditorCopyButton
          getContents={mockGetContents}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      expect(button).toBeInTheDocument();
      act(() => {
        button.focus();
      });
      expect(document.activeElement).toBe(button);
    });
  });

  describe('Props forwarding', () => {
    test('forwards additional props to button element', () => {
      render(
        <CodeEditorCopyButton
          getContents={mockGetContents}
          onCopy={mockOnCopy}
          data-testid="custom-copy-button"
          title="Custom title"
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      expect(button).toHaveAttribute('data-testid', 'custom-copy-button');
      expect(button).toHaveAttribute('title', 'Custom title');
    });
  });
});
