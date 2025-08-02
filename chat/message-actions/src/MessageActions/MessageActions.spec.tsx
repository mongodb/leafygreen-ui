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

  test('renders rating buttons when onRatingChange is provided', () => {
    render(<MessageActions {...defaultProps} onRatingChange={jest.fn()} />);

    expect(
      screen.getByRole('radio', { name: 'Like this message' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('radio', { name: 'Dislike this message' }),
    ).toBeInTheDocument();
  });

  test('does not render rating buttons when onRatingChange is not provided', () => {
    render(<MessageActions {...defaultProps} />);

    expect(
      screen.queryByRole('radio', { name: 'Like this message' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('radio', { name: 'Dislike this message' }),
    ).not.toBeInTheDocument();
  });

  test('renders feedback form when rating is selected and onSubmitFeedback is provided', () => {
    render(
      <MessageActions
        {...defaultProps}
        onRatingChange={jest.fn()}
        onSubmitFeedback={jest.fn()}
      />,
    );

    // Initially, feedback form should not be visible
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

    // Click thumbs up to trigger feedback form
    const thumbsUpButton = screen.getByRole('radio', {
      name: 'Like this message',
    });
    userEvent.click(thumbsUpButton);

    // Feedback form should now be visible
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  test('does not render feedback form when onSubmitFeedback is not provided', () => {
    const { onClickCopy, onClickRetry } = defaultProps;
    render(
      <MessageActions
        onClickCopy={onClickCopy}
        onClickRetry={onClickRetry}
        onRatingChange={jest.fn()}
      />,
    );

    // Click thumbs up button
    const thumbsUpButton = screen.getByRole('radio', {
      name: 'Like this message',
    });
    userEvent.click(thumbsUpButton);

    // Feedback form should not be visible
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Submit' }),
    ).not.toBeInTheDocument();
  });

  test('calls onClickCopy when copy button is clicked', () => {
    render(<MessageActions {...defaultProps} />);

    const copyButton = screen.getByRole('button', { name: 'Copy message' });
    userEvent.click(copyButton);

    expect(defaultProps.onClickCopy).toHaveBeenCalledTimes(1);
  });

  test('calls onClickRetry when retry button is clicked', () => {
    render(<MessageActions {...defaultProps} />);

    const retryButton = screen.getByRole('button', {
      name: 'Retry message',
    });
    userEvent.click(retryButton);

    expect(defaultProps.onClickRetry).toHaveBeenCalledTimes(1);
  });

  test('shows feedback form when rating is selected', () => {
    render(
      <MessageActions
        {...defaultProps}
        onRatingChange={jest.fn()}
        onSubmitFeedback={jest.fn()}
      />,
    );

    // Initially, feedback form should not be visible
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

    // Click thumbs up to trigger feedback form
    const thumbsUpButton = screen.getByRole('radio', {
      name: 'Like this message',
    });
    userEvent.click(thumbsUpButton);

    // Feedback form should now be visible
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  test('submits feedback when submit button is clicked', () => {
    const mockOnSubmitFeedback = jest.fn();
    render(
      <MessageActions
        {...defaultProps}
        onRatingChange={jest.fn()}
        onSubmitFeedback={mockOnSubmitFeedback}
      />,
    );

    // Select a rating
    const thumbsUpButton = screen.getByRole('radio', {
      name: 'Like this message',
    });
    userEvent.click(thumbsUpButton);

    // Fill in feedback
    const feedbackTextarea = screen.getByRole('textbox');
    userEvent.type(feedbackTextarea, 'Great response!');

    // Submit feedback
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    userEvent.click(submitButton);

    expect(mockOnSubmitFeedback).toHaveBeenCalledWith(expect.any(Object), {
      rating: MessageRatingValue.Liked,
      feedback: 'Great response!',
    });
  });

  test('handles feedback text input', () => {
    render(
      <MessageActions
        {...defaultProps}
        onRatingChange={jest.fn()}
        onSubmitFeedback={jest.fn()}
      />,
    );

    // Select a rating to show feedback form
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
    render(
      <MessageActions
        {...defaultProps}
        onRatingChange={jest.fn()}
        onSubmitFeedback={jest.fn()}
        onCloseFeedback={mockOnCloseFeedback}
      />,
    );

    // Select a rating to show feedback form
    const thumbsUpButton = screen.getByRole('radio', {
      name: 'Like this message',
    });
    userEvent.click(thumbsUpButton);

    // Fill in some feedback
    const textarea = screen.getByRole('textbox');
    userEvent.type(textarea, 'Test feedback');

    // Click close button
    const closeButton = screen.getByRole('button', {
      name: 'Close feedback window',
    });
    userEvent.click(closeButton);

    expect(mockOnCloseFeedback).toHaveBeenCalledTimes(1);
  });

  test('shows submitted message after feedback is submitted', () => {
    render(
      <MessageActions
        {...defaultProps}
        onRatingChange={jest.fn()}
        onSubmitFeedback={jest.fn()}
      />,
    );

    // Select a rating
    const thumbsUpButton = screen.getByRole('radio', {
      name: 'Like this message',
    });
    userEvent.click(thumbsUpButton);

    // Fill in feedback and submit
    const feedbackTextarea = screen.getByRole('textbox');
    userEvent.type(feedbackTextarea, 'Great response!');
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    userEvent.click(submitButton);

    // Should show submitted message
    expect(screen.getByText('Thanks for your feedback!')).toBeInTheDocument();
  });

  test('MessageRating buttons become non-interactable after feedback submission', () => {
    render(
      <MessageActions
        {...defaultProps}
        onRatingChange={jest.fn()}
        onSubmitFeedback={jest.fn()}
      />,
    );

    // Select a rating
    const thumbsUpButton = screen.getByRole('radio', {
      name: 'Like this message',
    });
    userEvent.click(thumbsUpButton);

    // Fill in feedback and submit
    const feedbackTextarea = screen.getByRole('textbox');
    userEvent.type(feedbackTextarea, 'Great response!');
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    userEvent.click(submitButton);

    // After submission, the MessageRating component should be inert
    // Find the MessageRating container by looking for the radiogroup's parent
    const radiogroup = screen.getByRole('radiogroup');
    const messageRatingContainer = radiogroup.parentElement;
    expect(messageRatingContainer).toHaveAttribute('inert', 'inert');
  });

  test('calls onRatingChange when rating buttons are clicked', () => {
    const mockOnRatingChange = jest.fn();
    render(
      <MessageActions {...defaultProps} onRatingChange={mockOnRatingChange} />,
    );

    // Click thumbs up button
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

    // Click thumbs down button
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

  test('does not call onRatingChange when isSubmitted is true', () => {
    const mockOnRatingChange = jest.fn();
    render(
      <MessageActions {...defaultProps} onRatingChange={mockOnRatingChange} />,
    );

    // Submit feedback first
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

    // Try to click rating buttons after submission
    const thumbsDownButton = screen.getByRole('radio', {
      name: 'Dislike this message',
    });
    userEvent.click(thumbsDownButton);

    // onRatingChange should not be called when isSubmitted is true
    expect(mockOnRatingChange).not.toHaveBeenCalled();
  });

  test('does not submit feedback form when feedback is not provided', () => {
    render(
      <MessageActions
        {...defaultProps}
        onRatingChange={jest.fn()}
        onSubmitFeedback={jest.fn()}
      />,
    );

    // Select a rating
    const thumbsUpButton = screen.getByRole('radio', {
      name: 'Like this message',
    });
    userEvent.click(thumbsUpButton);

    // Try to submit without providing feedback
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    userEvent.click(submitButton);

    expect(defaultProps.onSubmitFeedback).not.toHaveBeenCalled();
  });

  test('does not submit feedback form when no rating is selected', () => {
    render(
      <MessageActions
        {...defaultProps}
        onRatingChange={jest.fn()}
        onSubmitFeedback={jest.fn()}
      />,
    );

    // Try to submit without selecting a rating
    const submitButton = screen.queryByRole('button', { name: 'Submit' });
    expect(submitButton).not.toBeInTheDocument();

    expect(defaultProps.onSubmitFeedback).not.toHaveBeenCalled();
  });

  test('uses custom submit button text', () => {
    render(
      <MessageActions
        {...defaultProps}
        onRatingChange={jest.fn()}
        onSubmitFeedback={jest.fn()}
        submitButtonText="Send Feedback"
      />,
    );

    // Select a rating to show feedback form
    const thumbsUpButton = screen.getByRole('radio', {
      name: 'Like this message',
    });
    userEvent.click(thumbsUpButton);

    expect(
      screen.getByRole('button', { name: 'Send Feedback' }),
    ).toBeInTheDocument();
  });

  test('uses custom submitted message', () => {
    render(
      <MessageActions
        {...defaultProps}
        onRatingChange={jest.fn()}
        onSubmitFeedback={jest.fn()}
        submittedMessage="Feedback received!"
      />,
    );

    // Select a rating
    const thumbsUpButton = screen.getByRole('radio', {
      name: 'Like this message',
    });
    userEvent.click(thumbsUpButton);

    // Fill in feedback and submit
    const feedbackTextarea = screen.getByRole('textbox');
    userEvent.type(feedbackTextarea, 'Great response!');
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    userEvent.click(submitButton);

    // Should show custom submitted message
    expect(screen.getByText('Feedback received!')).toBeInTheDocument();
  });

  test('handles thumbs down rating', () => {
    const mockOnSubmitFeedback = jest.fn();
    render(
      <MessageActions
        {...defaultProps}
        onRatingChange={jest.fn()}
        onSubmitFeedback={mockOnSubmitFeedback}
      />,
    );

    // Select thumbs down
    const thumbsDownButton = screen.getByRole('radio', {
      name: 'Dislike this message',
    });
    userEvent.click(thumbsDownButton);

    // Fill in feedback
    const feedbackTextarea = screen.getByRole('textbox');
    userEvent.type(feedbackTextarea, 'Not helpful');

    // Submit feedback
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    userEvent.click(submitButton);

    expect(mockOnSubmitFeedback).toHaveBeenCalledWith(expect.any(Object), {
      rating: MessageRatingValue.Disliked,
      feedback: 'Not helpful',
    });
  });

  // Tests for optional props behavior
  describe('optional props behavior', () => {
    test('renders only copy button when only onClickCopy is provided', () => {
      render(<MessageActions onClickCopy={jest.fn()} />);

      expect(
        screen.getByRole('button', { name: 'Copy message' }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Retry message' }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('radio', { name: 'Like this message' }),
      ).not.toBeInTheDocument();
    });

    test('renders only retry button when only onClickRetry is provided', () => {
      render(<MessageActions onClickRetry={jest.fn()} />);

      expect(
        screen.queryByRole('button', { name: 'Copy message' }),
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Retry message' }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('radio', { name: 'Like this message' }),
      ).not.toBeInTheDocument();
    });

    test('renders only rating buttons when only onRatingChange is provided', () => {
      render(<MessageActions onRatingChange={jest.fn()} />);

      expect(
        screen.queryByRole('button', { name: 'Copy message' }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Retry message' }),
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole('radio', { name: 'Like this message' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('radio', { name: 'Dislike this message' }),
      ).toBeInTheDocument();
    });

    test('renders all buttons when all optional props are provided', () => {
      render(
        <MessageActions
          onClickCopy={jest.fn()}
          onClickRetry={jest.fn()}
          onRatingChange={jest.fn()}
          onSubmitFeedback={jest.fn()}
        />,
      );

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

    test('shows feedback form when rating is selected and onSubmitFeedback is provided', () => {
      render(
        <MessageActions
          onRatingChange={jest.fn()}
          onSubmitFeedback={jest.fn()}
        />,
      );

      // Click thumbs up to trigger feedback form
      const thumbsUpButton = screen.getByRole('radio', {
        name: 'Like this message',
      });
      userEvent.click(thumbsUpButton);

      // Feedback form should now be visible
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Submit' }),
      ).toBeInTheDocument();
    });

    test('does not show feedback form when rating is selected but onSubmitFeedback is not provided', () => {
      render(<MessageActions onRatingChange={jest.fn()} />);

      // Click thumbs up button
      const thumbsUpButton = screen.getByRole('radio', {
        name: 'Like this message',
      });
      userEvent.click(thumbsUpButton);

      // Feedback form should not be visible
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Submit' }),
      ).not.toBeInTheDocument();
    });

    test('submits feedback when submit button is clicked and onSubmitFeedback is provided', () => {
      const mockOnSubmitFeedback = jest.fn();
      render(
        <MessageActions
          onRatingChange={jest.fn()}
          onSubmitFeedback={mockOnSubmitFeedback}
        />,
      );

      // Select a rating
      const thumbsUpButton = screen.getByRole('radio', {
        name: 'Like this message',
      });
      userEvent.click(thumbsUpButton);

      // Fill in feedback
      const feedbackTextarea = screen.getByRole('textbox');
      userEvent.type(feedbackTextarea, 'Great response!');

      // Submit feedback
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      userEvent.click(submitButton);

      expect(mockOnSubmitFeedback).toHaveBeenCalledWith(expect.any(Object), {
        rating: MessageRatingValue.Liked,
        feedback: 'Great response!',
      });
    });
  });
});
