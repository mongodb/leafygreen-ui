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

describe('CodeEditorCopyButton', () => {
  const mockgetContentsToCopy = jest.fn(() => 'test content');
  const mockOnCopy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useFakeTimers();
    mockWriteText.mockResolvedValue(undefined);
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
          getContentsToCopy={mockgetContentsToCopy}
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
          getContentsToCopy={mockgetContentsToCopy}
          onCopy={mockOnCopy}
          variant={CopyButtonVariant.IconButton}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', COPY_TEXT);
    });

    test('renders with custom className', () => {
      render(
        <CodeEditorCopyButton
          getContentsToCopy={mockgetContentsToCopy}
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
          getContentsToCopy={mockgetContentsToCopy}
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
          getContentsToCopy={mockgetContentsToCopy}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });

      await act(async () => {
        await userEvent.hover(button);
        // Advance timers to account for tooltip hover delay
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(screen.getByText(COPY_TEXT)).toBeInTheDocument();
      });
    });

    test('shows copied text in tooltip after successful copy', async () => {
      render(
        <CodeEditorCopyButton
          getContentsToCopy={mockgetContentsToCopy}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });

      await act(async () => {
        await userEvent.click(button);
        await userEvent.hover(button);
        // Advance timers to account for tooltip hover delay
        jest.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(screen.getAllByText(COPIED_TEXT)[0]).toBeInTheDocument();
      });
    });
  });

  describe('Copy functionality', () => {
    test('calls getContentsToCopy and clipboard API on click', async () => {
      render(
        <CodeEditorCopyButton
          getContentsToCopy={mockgetContentsToCopy}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });

      await act(async () => {
        await userEvent.click(button);
      });

      await waitFor(() => {
        expect(mockgetContentsToCopy).toHaveBeenCalledTimes(1);
        expect(mockWriteText).toHaveBeenCalledWith('test content');
        expect(mockOnCopy).toHaveBeenCalledTimes(1);
      });
    });

    test('handles clipboard API errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockWriteText.mockRejectedValue(new Error('Clipboard error'));

      render(
        <CodeEditorCopyButton
          getContentsToCopy={mockgetContentsToCopy}
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
      render(
        <CodeEditorCopyButton getContentsToCopy={mockgetContentsToCopy} />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      await act(async () => {
        await userEvent.click(button);
      });

      expect(mockgetContentsToCopy).toHaveBeenCalledTimes(1);
      expect(mockWriteText).toHaveBeenCalledWith('test content');
    });
  });

  describe('Visual feedback', () => {
    test('shows checkmark icon after successful copy', async () => {
      render(
        <CodeEditorCopyButton
          getContentsToCopy={mockgetContentsToCopy}
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
          getContentsToCopy={mockgetContentsToCopy}
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
          getContentsToCopy={mockgetContentsToCopy}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      await act(async () => {
        button.focus();
        await userEvent.keyboard('{Enter}');
      });

      await waitFor(() => {
        expect(mockgetContentsToCopy).toHaveBeenCalledTimes(1);
        expect(mockWriteText).toHaveBeenCalledWith('test content');
        expect(mockOnCopy).toHaveBeenCalledTimes(1);
      });
    });

    test('triggers copy on Space key', async () => {
      render(
        <CodeEditorCopyButton
          getContentsToCopy={mockgetContentsToCopy}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      await act(async () => {
        button.focus();
        await userEvent.keyboard(' ');
      });

      await waitFor(() => {
        expect(mockgetContentsToCopy).toHaveBeenCalledTimes(1);
        expect(mockWriteText).toHaveBeenCalledWith('test content');
        expect(mockOnCopy).toHaveBeenCalledTimes(1);
      });
    });

    test('does not trigger copy on Escape key', async () => {
      render(
        <CodeEditorCopyButton
          getContentsToCopy={mockgetContentsToCopy}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      await act(async () => {
        button.focus();
        await userEvent.keyboard('{Escape}');
      });

      expect(mockgetContentsToCopy).not.toHaveBeenCalled();
      expect(mockWriteText).not.toHaveBeenCalled();
      expect(mockOnCopy).not.toHaveBeenCalled();
    });

    test('does not trigger copy on Tab key', async () => {
      render(
        <CodeEditorCopyButton
          getContentsToCopy={mockgetContentsToCopy}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      await act(async () => {
        button.focus();
        await userEvent.keyboard('{Tab}');
      });

      expect(mockgetContentsToCopy).not.toHaveBeenCalled();
      expect(mockWriteText).not.toHaveBeenCalled();
      expect(mockOnCopy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('has proper aria-label', () => {
      render(
        <CodeEditorCopyButton
          getContentsToCopy={mockgetContentsToCopy}
          onCopy={mockOnCopy}
        />,
      );

      const button = screen.getByRole('button', { name: COPY_TEXT });
      expect(button).toHaveAttribute('aria-label', COPY_TEXT);
    });

    test('announces copy success to screen readers', async () => {
      render(
        <CodeEditorCopyButton
          getContentsToCopy={mockgetContentsToCopy}
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
          getContentsToCopy={mockgetContentsToCopy}
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
          getContentsToCopy={mockgetContentsToCopy}
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
