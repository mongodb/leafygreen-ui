import React from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { Message } from '@lg-chat/message';
import { MessageRatingValue } from '@lg-chat/message-rating';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MessageActions, MessageActionsProps } from '.';

jest.mock('@lg-chat/lg-markdown', () => ({
  LGMarkdown: jest.fn(({ children }) => <div>{children}</div>),
}));

// Mock the clipboard API
const mockClipboard = {
  writeText: jest.fn().mockResolvedValue(undefined),
};

// Mock the clipboard API globally
Object.defineProperty(navigator, 'clipboard', {
  value: mockClipboard,
  writable: true,
});

const renderMessageActions = (
  props?: Partial<MessageActionsProps>,
  options: {
    variant?: Variant;
    messageBody?: string;
  } = {},
) => {
  const { variant = Variant.Compact, messageBody = 'Test message body' } =
    options;

  return render(
    <LeafyGreenChatProvider variant={variant}>
      <Message messageBody={messageBody}>
        <MessageActions {...props} />
      </Message>
    </LeafyGreenChatProvider>,
  );
};

describe('packages/message-actions', () => {
  beforeAll(() => {
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockClipboard.writeText.mockResolvedValue(undefined);
  });

  test('renders nothing in spacious mode', () => {
    renderMessageActions({}, { variant: Variant.Spacious });

    expect(screen.queryByRole('button', { name: 'Copy message' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Retry message' })).toBeNull();
    expect(
      screen.queryByRole('radio', { name: 'Like this message' }),
    ).toBeNull();
    expect(
      screen.queryByRole('radio', { name: 'Dislike this message' }),
    ).toBeNull();
  });

  test('renders all buttons when onClickRetry and onRatingChange are provided', () => {
    renderMessageActions({
      onClickRetry: jest.fn(),
      onRatingChange: jest.fn(),
    });

    expect(
      screen.getByRole('button', { name: 'Copy message' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Retry message' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('radio', { name: 'Like this message' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('radio', { name: 'Dislike this message' }),
    ).toBeInTheDocument();
  });

  describe('copy button', () => {
    test('renders copy button in compact mode by default', () => {
      renderMessageActions();

      expect(
        screen.getByRole('button', { name: 'Copy message' }),
      ).toBeInTheDocument();
    });

    test('calls onClickCopy when copy button is clicked', async () => {
      const mockOnClickCopy = jest.fn();
      renderMessageActions({ onClickCopy: mockOnClickCopy });

      const copyButton = screen.getByRole('button', { name: 'Copy message' });
      userEvent.click(copyButton);

      // Wait for the clipboard API call to complete
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(mockOnClickCopy).toHaveBeenCalledTimes(1);
    });

    test('uses messageBody from context for copy functionality', async () => {
      const mockOnClickCopy = jest.fn();
      const testMessageBody = 'Test message content from context';

      renderMessageActions(
        { onClickCopy: mockOnClickCopy },
        { messageBody: testMessageBody },
      );

      const copyButton = screen.getByRole('button', { name: 'Copy message' });
      userEvent.click(copyButton);

      // Wait for the clipboard API call to complete
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(mockClipboard.writeText).toHaveBeenCalledWith(testMessageBody);
      expect(mockOnClickCopy).toHaveBeenCalled();
    });

    test('handles missing messageBody in context gracefully', async () => {
      const mockOnClickCopy = jest.fn();

      const { container: _container } = render(
        <LeafyGreenChatProvider variant={Variant.Compact}>
          <Message messageBody={undefined}>
            <MessageActions onClickCopy={mockOnClickCopy} />
          </Message>
        </LeafyGreenChatProvider>,
      );

      const copyButton = screen.getByRole('button', { name: 'Copy message' });
      userEvent.click(copyButton);

      // Wait for the clipboard API call to complete
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(mockClipboard.writeText).not.toHaveBeenCalled();
      expect(mockOnClickCopy).not.toHaveBeenCalled();
    });
  });

  describe('retry button', () => {
    test('renders retry button when onClickRetry is provided', () => {
      renderMessageActions({ onClickRetry: jest.fn() });

      expect(
        screen.getByRole('button', { name: 'Retry message' }),
      ).toBeInTheDocument();
    });

    test('does not render retry button when onClickRetry is not provided', () => {
      renderMessageActions();

      expect(
        screen.queryByRole('button', { name: 'Retry message' }),
      ).toBeNull();
    });

    test('calls onClickRetry when retry button is clicked', () => {
      const mockOnClickRetry = jest.fn();
      renderMessageActions({ onClickRetry: mockOnClickRetry });

      const retryButton = screen.getByRole('button', {
        name: 'Retry message',
      });
      userEvent.click(retryButton);

      expect(mockOnClickRetry).toHaveBeenCalledTimes(1);
    });
  });

  describe('rating buttons', () => {
    test('renders rating buttons when onRatingChange is provided', () => {
      renderMessageActions({ onRatingChange: jest.fn() });

      expect(
        screen.getByRole('radio', { name: 'Like this message' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('radio', { name: 'Dislike this message' }),
      ).toBeInTheDocument();
    });

    test('does not render rating buttons when onRatingChange is not provided', () => {
      renderMessageActions();

      expect(
        screen.queryByRole('radio', { name: 'Like this message' }),
      ).toBeNull();
    });

    test('calls onRatingChange when rating buttons are clicked', () => {
      const mockOnRatingChange = jest.fn();
      renderMessageActions({
        onRatingChange: mockOnRatingChange,
      });

      const thumbsUpButton = screen.getByRole('radio', {
        name: 'Like this message',
      });
      userEvent.click(thumbsUpButton);

      expect(mockOnRatingChange).toHaveBeenCalledTimes(1);
      expect(mockOnRatingChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: 'liked' }),
        }),
        { rating: 'liked' },
      );

      const thumbsDownButton = screen.getByRole('radio', {
        name: 'Dislike this message',
      });
      userEvent.click(thumbsDownButton);

      expect(mockOnRatingChange).toHaveBeenCalledTimes(2);
      expect(mockOnRatingChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: 'disliked' }),
        }),
        { rating: 'disliked' },
      );
    });

    test('MessageRating buttons become non-interactable after feedback submission', () => {
      renderMessageActions({
        onRatingChange: jest.fn(),
        onSubmitFeedback: jest.fn(),
      });

      const thumbsUpButton = screen.getByRole('radio', {
        name: 'Like this message',
      });
      userEvent.click(thumbsUpButton);

      const feedbackTextarea = screen.getByRole('textbox');
      userEvent.type(feedbackTextarea, 'Great response!');

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      userEvent.click(submitButton);

      const radiogroup = screen.getByRole('radiogroup');
      const messageRatingContainer = radiogroup.parentElement;
      expect(messageRatingContainer).toHaveAttribute('inert', 'inert');
    });

    test('does not call onRatingChange when isSubmitted is true', () => {
      const mockOnRatingChange = jest.fn();
      const mockOnSubmitFeedback = jest.fn();
      renderMessageActions({
        onRatingChange: mockOnRatingChange,
        onSubmitFeedback: mockOnSubmitFeedback,
      });

      const thumbsUpButton = screen.getByRole('radio', {
        name: 'Like this message',
      });
      userEvent.click(thumbsUpButton);

      const feedbackTextarea = screen.getByRole('textbox');
      userEvent.type(feedbackTextarea, 'Great response!');

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      userEvent.click(submitButton);

      // Clear the mock to check only new calls
      mockOnRatingChange.mockClear();

      const thumbsDownButton = screen.getByRole('radio', {
        name: 'Dislike this message',
      });
      userEvent.click(thumbsDownButton);

      expect(mockOnRatingChange).not.toHaveBeenCalled();
    });
  });

  describe('feedback form', () => {
    test('renders feedback form when rating is selected and onSubmitFeedback is provided', () => {
      renderMessageActions({
        onRatingChange: jest.fn(),
        onSubmitFeedback: jest.fn(),
      });

      expect(screen.queryByRole('textbox')).toBeNull();

      const thumbsUpButton = screen.getByRole('radio', {
        name: 'Like this message',
      });
      userEvent.click(thumbsUpButton);

      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Submit' }),
      ).toBeInTheDocument();
    });

    test('does not render feedback form when onSubmitFeedback is not provided', () => {
      renderMessageActions({
        onRatingChange: jest.fn(),
      });

      const thumbsUpButton = screen.getByRole('radio', {
        name: 'Like this message',
      });
      userEvent.click(thumbsUpButton);

      expect(screen.queryByRole('textbox')).toBeNull();
      expect(screen.queryByRole('button', { name: 'Submit' })).toBeNull();
    });

    test('calls onSubmitFeedback when submit button is clicked', () => {
      const mockOnSubmitFeedback = jest.fn();
      renderMessageActions({
        onRatingChange: jest.fn(),
        onSubmitFeedback: mockOnSubmitFeedback,
      });

      const thumbsUpButton = screen.getByRole('radio', {
        name: 'Like this message',
      });
      userEvent.click(thumbsUpButton);

      const feedbackTextarea = screen.getByRole('textbox');
      userEvent.type(feedbackTextarea, 'Great response!');

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      userEvent.click(submitButton);

      expect(mockOnSubmitFeedback).toHaveBeenCalledWith(expect.any(Object), {
        rating: MessageRatingValue.Liked,
        feedback: 'Great response!',
      });
    });

    test('handles feedback text input', () => {
      renderMessageActions({
        onRatingChange: jest.fn(),
        onSubmitFeedback: jest.fn(),
      });

      const thumbsUpButton = screen.getByRole('radio', {
        name: 'Like this message',
      });
      userEvent.click(thumbsUpButton);

      const textarea = screen.getByRole('textbox');
      userEvent.type(textarea, 'This is a test comment');

      expect(textarea).toHaveValue('This is a test comment');
    });

    test('closes feedback form when close button is clicked', () => {
      const mockOnCloseFeedback = jest.fn();
      renderMessageActions({
        onRatingChange: jest.fn(),
        onSubmitFeedback: jest.fn(),
        onCloseFeedback: mockOnCloseFeedback,
      });

      const thumbsUpButton = screen.getByRole('radio', {
        name: 'Like this message',
      });
      userEvent.click(thumbsUpButton);

      const textarea = screen.getByRole('textbox');
      userEvent.type(textarea, 'Test feedback');

      const closeButton = screen.getByRole('button', {
        name: 'Close feedback window',
      });
      userEvent.click(closeButton);

      expect(mockOnCloseFeedback).toHaveBeenCalledTimes(1);
    });

    test('uses custom submit button text', () => {
      renderMessageActions({
        onRatingChange: jest.fn(),
        onSubmitFeedback: jest.fn(),
        submitButtonText: 'Send Feedback',
      });

      const thumbsUpButton = screen.getByRole('radio', {
        name: 'Like this message',
      });
      userEvent.click(thumbsUpButton);

      expect(
        screen.getByRole('button', { name: 'Send Feedback' }),
      ).toBeInTheDocument();
    });

    test('does not submit feedback form when no rating is selected', () => {
      renderMessageActions({
        onRatingChange: jest.fn(),
        onSubmitFeedback: jest.fn(),
      });

      const submitButton = screen.queryByRole('button', { name: 'Submit' });

      expect(submitButton).toBeNull();
    });

    test('does not submit feedback form when feedback is not provided', () => {
      renderMessageActions({
        onRatingChange: jest.fn(),
        onSubmitFeedback: jest.fn(),
      });

      const thumbsUpButton = screen.getByRole('radio', {
        name: 'Like this message',
      });
      userEvent.click(thumbsUpButton);

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      userEvent.click(submitButton);

      expect(
        screen.getByRole('button', { name: 'Submit' }),
      ).toBeInTheDocument();
    });

    test('shows submitted message after feedback is submitted', () => {
      renderMessageActions({
        onRatingChange: jest.fn(),
        onSubmitFeedback: jest.fn(),
      });

      const thumbsUpButton = screen.getByRole('radio', {
        name: 'Like this message',
      });
      userEvent.click(thumbsUpButton);

      const feedbackTextarea = screen.getByRole('textbox');
      userEvent.type(feedbackTextarea, 'Great response!');

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      userEvent.click(submitButton);

      expect(screen.getByText('Thanks for your feedback!')).toBeInTheDocument();
    });

    test('uses custom submitted message', () => {
      renderMessageActions({
        onRatingChange: jest.fn(),
        onSubmitFeedback: jest.fn(),
        submittedMessage: 'Feedback received!',
      });

      const thumbsUpButton = screen.getByRole('radio', {
        name: 'Like this message',
      });
      userEvent.click(thumbsUpButton);

      const feedbackTextarea = screen.getByRole('textbox');
      userEvent.type(feedbackTextarea, 'Great response!');

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      userEvent.click(submitButton);

      expect(screen.getByText('Feedback received!')).toBeInTheDocument();
    });

    test('handles feedback submission failure gracefully', async () => {
      const mockOnSubmitFeedback = jest
        .fn()
        .mockRejectedValue(new Error('Network error'));
      const errorMessage = 'Failed to submit feedback. Please try again.';

      renderMessageActions({
        onRatingChange: jest.fn(),
        onSubmitFeedback: mockOnSubmitFeedback,
        errorMessage,
      });

      const thumbsUpButton = screen.getByRole('radio', {
        name: 'Like this message',
      });
      userEvent.click(thumbsUpButton);

      const feedbackTextarea = screen.getByRole('textbox');
      userEvent.type(feedbackTextarea, 'Great response!');

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      userEvent.click(submitButton);

      // Wait for the async operation to complete
      await new Promise(resolve => setTimeout(resolve, 0));

      // Verify error message is displayed
      expect(screen.getByText(errorMessage)).toBeInTheDocument();

      // Verify feedback form is still visible and interactive
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Submit' }),
      ).toBeInTheDocument();

      // Verify the form is not in submitted state
      expect(screen.queryByText('Thanks for your feedback!')).toBeNull();
    });

    test('shows default error message when no custom error message is provided', async () => {
      const mockOnSubmitFeedback = jest.fn().mockImplementation(() => {
        throw new Error('Network error');
      });

      renderMessageActions({
        onRatingChange: jest.fn(),
        onSubmitFeedback: mockOnSubmitFeedback,
      });

      const thumbsUpButton = screen.getByRole('radio', {
        name: 'Like this message',
      });
      userEvent.click(thumbsUpButton);

      const feedbackTextarea = screen.getByRole('textbox');
      userEvent.type(feedbackTextarea, 'Great response!');

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      userEvent.click(submitButton);

      // Wait for the async operation to complete
      await new Promise(resolve => setTimeout(resolve, 0));

      // Verify default error message is displayed
      expect(screen.getByText('Oops, please try again.')).toBeInTheDocument();
    });

    test('allows retry after feedback submission failure', async () => {
      let callCount = 0;
      const mockOnSubmitFeedback = jest.fn().mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          throw new Error('Network error');
        } else {
          // Success on retry
          return;
        }
      });
      const errorMessage = 'Failed to submit feedback. Please try again.';

      renderMessageActions({
        onRatingChange: jest.fn(),
        onSubmitFeedback: mockOnSubmitFeedback,
        errorMessage,
      });

      const thumbsUpButton = screen.getByRole('radio', {
        name: 'Like this message',
      });
      userEvent.click(thumbsUpButton);

      const feedbackTextarea = screen.getByRole('textbox');
      userEvent.type(feedbackTextarea, 'Great response!');

      const submitButton = screen.getByRole('button', { name: 'Submit' });

      // First submission fails
      userEvent.click(submitButton);
      await new Promise(resolve => setTimeout(resolve, 0));

      // Verify error state
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();

      // Retry submission
      userEvent.click(submitButton);
      await new Promise(resolve => setTimeout(resolve, 0));

      // Verify success state
      expect(screen.getByText('Thanks for your feedback!')).toBeInTheDocument();
      expect(screen.queryByText(errorMessage)).toBeNull();
      expect(screen.queryByRole('textbox')).toBeNull();
    });
  });

  describe('state management', () => {
    test('transitions through all form states correctly', async () => {
      const mockOnSubmitFeedback = jest.fn().mockImplementation(() => {
        // Synchronous success
        return;
      });

      renderMessageActions({
        onRatingChange: jest.fn(),
        onSubmitFeedback: mockOnSubmitFeedback,
      });

      // Initial state - no form visible
      expect(screen.queryByRole('textbox')).toBeNull();

      // Select rating - form becomes visible
      const thumbsUpButton = screen.getByRole('radio', {
        name: 'Like this message',
      });
      userEvent.click(thumbsUpButton);

      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Submit' }),
      ).toBeInTheDocument();

      // Type feedback and submit
      const feedbackTextarea = screen.getByRole('textbox');
      userEvent.type(feedbackTextarea, 'Great response!');

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      userEvent.click(submitButton);

      // Wait for submission to complete
      await new Promise(resolve => setTimeout(resolve, 0));

      // Verify submitted state
      expect(screen.getByText('Thanks for your feedback!')).toBeInTheDocument();
      expect(screen.queryByRole('textbox')).toBeNull();
      expect(screen.queryByRole('button', { name: 'Submit' })).toBeNull();
    });

    test('resets state when feedback form is closed', () => {
      const mockOnCloseFeedback = jest.fn();

      renderMessageActions({
        onRatingChange: jest.fn(),
        onSubmitFeedback: jest.fn(),
        onCloseFeedback: mockOnCloseFeedback,
      });

      // Select rating
      const thumbsUpButton = screen.getByRole('radio', {
        name: 'Like this message',
      });
      userEvent.click(thumbsUpButton);

      // Verify form is visible
      expect(screen.getByRole('textbox')).toBeInTheDocument();

      // Close form
      const closeButton = screen.getByRole('button', {
        name: 'Close feedback window',
      });
      userEvent.click(closeButton);

      // Verify form is hidden and state is reset
      expect(screen.queryByRole('textbox')).toBeNull();
      expect(mockOnCloseFeedback).toHaveBeenCalled();
    });

    test('maintains error state until form is closed or retried', async () => {
      const mockOnSubmitFeedback = jest.fn().mockImplementation(() => {
        throw new Error('Network error');
      });

      renderMessageActions({
        onRatingChange: jest.fn(),
        onSubmitFeedback: mockOnSubmitFeedback,
        errorMessage: 'Submission failed',
      });

      // Select rating and submit
      const thumbsUpButton = screen.getByRole('radio', {
        name: 'Like this message',
      });
      userEvent.click(thumbsUpButton);

      const feedbackTextarea = screen.getByRole('textbox');
      userEvent.type(feedbackTextarea, 'Test feedback');

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      userEvent.click(submitButton);

      // Wait for error to occur
      await new Promise(resolve => setTimeout(resolve, 0));

      // Verify error state persists
      expect(screen.getByText('Submission failed')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();

      // Close form to reset state
      const closeButton = screen.getByRole('button', {
        name: 'Close feedback window',
      });
      userEvent.click(closeButton);

      // Verify form is hidden
      expect(screen.queryByRole('textbox')).toBeNull();
      expect(screen.queryByText('Submission failed')).toBeNull();
    });
  });
});
