import React from 'react';
import { Variant } from '@lg-chat/leafygreen-chat-provider';
import { MessageRatingValue } from '@lg-chat/message-rating';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MessageActions } from '.';

jest.mock('@lg-chat/leafygreen-chat-provider', () => {
  const actual = jest.requireActual('@lg-chat/leafygreen-chat-provider');
  return {
    ...actual,
    useLeafyGreenChatContext: jest.fn(),
  };
});

const defaultProps = {
  onClickCopy: jest.fn(),
  onClickRetry: jest.fn(),
  onSubmitFeedback: jest.fn(),
};

const mockUseLeafyGreenChatContext = jest.mocked(
  require('@lg-chat/leafygreen-chat-provider').useLeafyGreenChatContext,
);

describe('packages/message-actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default to compact mode
    mockUseLeafyGreenChatContext.mockReturnValue({ variant: Variant.Compact });
  });

  test('renders nothing when not in compact mode', () => {
    mockUseLeafyGreenChatContext.mockReturnValue({ variant: Variant.Spacious });

    const { container } = render(<MessageActions {...defaultProps} />);

    expect(container.firstChild).toBeNull();
  });

  test('renders copy and retry buttons in compact mode', () => {
    render(<MessageActions {...defaultProps} />);

    expect(
      screen.getByRole('button', { name: 'Copy message' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Retry message' }),
    ).toBeInTheDocument();
  });

  test('calls onClickCopy when copy button is clicked', () => {
    render(<MessageActions {...defaultProps} />);

    const copyButton = screen.getByRole('button', { name: 'Copy message' });
    userEvent.click(copyButton);

    expect(defaultProps.onClickCopy).toHaveBeenCalledTimes(1);
  });

  test('calls onClickRetry when retry button is clicked', () => {
    render(<MessageActions {...defaultProps} />);

    // Select a rating first to show the feedback form
    const thumbsUpButton = screen.getByRole('radio', {
      name: 'Thumbs up this message',
    });
    userEvent.click(thumbsUpButton);

    const retryButton = screen.getByRole('button', { name: 'Retry message' });
    userEvent.click(retryButton);

    expect(defaultProps.onClickRetry).toHaveBeenCalledTimes(1);
  });

  test('shows feedback form when rating is selected', () => {
    render(<MessageActions {...defaultProps} />);

    // Initially, feedback form should not be visible
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

    // Click thumbs up to trigger feedback form
    const thumbsUpButton = screen.getByRole('radio', {
      name: 'Thumbs up this message',
    });
    userEvent.click(thumbsUpButton);

    // Feedback form should now be visible
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  test('submits feedback when submit button is clicked', () => {
    render(<MessageActions {...defaultProps} />);

    // Select a rating
    const thumbsUpButton = screen.getByRole('radio', {
      name: 'Thumbs up this message',
    });
    userEvent.click(thumbsUpButton);

    // Type in feedback textarea
    const textarea = screen.getByRole('textbox');
    userEvent.type(textarea, 'This is a test comment');

    // Submit feedback
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    userEvent.click(submitButton);

    expect(defaultProps.onSubmitFeedback).toHaveBeenCalledTimes(1);
    expect(defaultProps.onSubmitFeedback).toHaveBeenCalledWith(
      expect.any(Object), // form event
      { rating: MessageRatingValue.Liked, feedback: 'This is a test comment' },
    );
  });

  test('handles feedback text input', () => {
    render(<MessageActions {...defaultProps} />);

    // Select a rating
    const thumbsUpButton = screen.getByRole('radio', {
      name: 'Thumbs up this message',
    });
    userEvent.click(thumbsUpButton);

    // Type in feedback textarea
    const textarea = screen.getByRole('textbox');
    userEvent.type(textarea, 'This is a test comment');

    // Submit feedback
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    userEvent.click(submitButton);

    expect(defaultProps.onSubmitFeedback).toHaveBeenCalledTimes(1);
    expect(defaultProps.onSubmitFeedback).toHaveBeenCalledWith(
      expect.any(Object), // form event
      { rating: MessageRatingValue.Liked, feedback: 'This is a test comment' },
    );
  });

  test('calls onCloseFeedback when feedback form is closed', () => {
    const onCloseFeedback = jest.fn();
    render(
      <MessageActions {...defaultProps} onCloseFeedback={onCloseFeedback} />,
    );

    // Select a rating to show feedback form
    const thumbsUpButton = screen.getByRole('radio', {
      name: 'Thumbs up this message',
    });
    userEvent.click(thumbsUpButton);

    // Click cancel button
    const closeButton = screen.getByRole('button', {
      name: 'Close feedback window',
    });
    userEvent.click(closeButton);

    expect(onCloseFeedback).toHaveBeenCalledTimes(1);
  });

  test('uses custom submit button text', () => {
    render(
      <MessageActions {...defaultProps} submitButtonText="Send Feedback" />,
    );

    // Select a rating
    const thumbsUpButton = screen.getByRole('radio', {
      name: 'Thumbs up this message',
    });
    userEvent.click(thumbsUpButton);

    expect(
      screen.getByRole('button', { name: 'Send Feedback' }),
    ).toBeInTheDocument();
  });

  test('does not render feedback form when no rating is selected', () => {
    render(<MessageActions {...defaultProps} />);

    // The submit button should not be visible when no rating is selected
    expect(
      screen.queryByRole('button', { name: 'Submit' }),
    ).not.toBeInTheDocument();

    expect(defaultProps.onSubmitFeedback).not.toHaveBeenCalled();
  });

  test('does not submit feedback form when feedback is not provided', () => {
    render(<MessageActions {...defaultProps} />);

    // Select a rating
    const thumbsUpButton = screen.getByRole('radio', {
      name: 'Thumbs up this message',
    });
    userEvent.click(thumbsUpButton);

    // Submit feedback
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    userEvent.click(submitButton);

    expect(defaultProps.onSubmitFeedback).not.toHaveBeenCalled();
  });

  test('handles thumbs down rating', () => {
    render(<MessageActions {...defaultProps} />);

    // Select thumbs down
    const thumbsDownButton = screen.getByRole('radio', {
      name: 'Thumbs down this message',
    });
    userEvent.click(thumbsDownButton);

    // Type in feedback textarea
    const textarea = screen.getByRole('textbox');
    userEvent.type(textarea, 'This is a test comment');

    // Submit feedback
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    userEvent.click(submitButton);

    expect(defaultProps.onSubmitFeedback).toHaveBeenCalledTimes(1);
    expect(defaultProps.onSubmitFeedback).toHaveBeenCalledWith(
      expect.any(Object), // form event
      {
        rating: MessageRatingValue.Disliked,
        feedback: 'This is a test comment',
      },
    );
  });
});
