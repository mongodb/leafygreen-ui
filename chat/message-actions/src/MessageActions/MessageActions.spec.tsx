import React from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { MessageRatingValue } from '@lg-chat/message-rating';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MessageActions, type MessageActionsProps } from '.';

const renderMessageActions = (
  props?: Partial<MessageActionsProps>,
  options: {
    variant?: Variant;
  } = {},
) => {
  const { variant = Variant.Compact } = options;

  return render(
    <LeafyGreenChatProvider variant={variant}>
      <MessageActions {...props} />
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

      expect(mockOnClickCopy).toHaveBeenCalledTimes(1);
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
  });
});
