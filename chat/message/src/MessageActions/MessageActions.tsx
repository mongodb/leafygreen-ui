import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  useLeafyGreenChatContext,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { FormState, InlineMessageFeedback } from '@lg-chat/message-feedback';
import { MessageRating, MessageRatingValue } from '@lg-chat/message-rating';

import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import RefreshIcon from '@leafygreen-ui/icon/dist/Refresh';
import { IconButton } from '@leafygreen-ui/icon-button';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { useMessageContext } from '../MessageContext';

import { FEEDBACK_TEXTAREA_TEST_ID } from './MessageActions.constants';
import {
  actionBarStyles,
  getContainerStyles,
  getDividerStyles,
  primaryActionsContainerStyles,
} from './MessageActions.styles';
import { MessageActionsProps } from './MessageActions.types';

export function MessageActions({
  children: _children,
  className,
  darkMode: darkModeProp,
  errorMessage,
  onClickCopy,
  onClickRetry,
  onCloseFeedback,
  onRatingChange,
  onSubmitFeedback,
  submitButtonText = 'Submit',
  submittedMessage = 'Thanks for your feedback!',
  ...rest
}: MessageActionsProps) {
  const { darkMode, theme } = useDarkMode(darkModeProp);
  const { variant } = useLeafyGreenChatContext();
  const isCompact = variant === Variant.Compact;
  const { messageBody } = useMessageContext();

  const [copied, setCopied] = useState(false);
  const [rating, setRating] = useState<MessageRatingValue>(
    MessageRatingValue.Unselected,
  );
  const [feedback, setFeedback] = useState<string>('');
  const [feedbackFormState, setFeedbackFormState] = useState<FormState>(
    FormState.Unset,
  );
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const isSubmitted = feedbackFormState === FormState.Submitted;
  const isSubmitting = feedbackFormState === FormState.Submitting;
  const isSubmitState = isSubmitted || isSubmitting;

  const resetFeedback = useCallback(() => {
    setFeedback('');
    setFeedbackFormState(FormState.Unset);
  }, []);

  const handleCopy = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      if (copied || !messageBody) {
        return;
      }

      try {
        await navigator.clipboard.writeText(messageBody);
        setCopied(true);
        onClickCopy?.(e);
        // reset copied state after 1.5 seconds
        setTimeout(() => setCopied(false), 1500);
      } catch (_err) {
        onClickCopy?.(e);
      }
    },
    [copied, messageBody, onClickCopy],
  );

  const handleRatingChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (isSubmitState) {
        return;
      }

      const newRating = e.target.value as MessageRatingValue;
      setRating(newRating);
      resetFeedback();
      setShowFeedbackForm(true);

      onRatingChange?.(e, { rating: newRating });
    },
    [isSubmitState, onRatingChange, resetFeedback],
  );

  const handleFeedbackChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (isSubmitState) {
        return;
      }
      setFeedback(e.target.value);
    },
    [isSubmitState],
  );

  /**
   * This callback is called when the user submits the feedback form.
   * Feedback collection is not critical to the user's experience, so
   * if it fails, it fails silently.
   */
  const handleFeedbackSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      if (rating === MessageRatingValue.Unselected || !feedback) {
        return;
      }

      setFeedbackFormState(FormState.Submitting);
      try {
        if (onSubmitFeedback) {
          const result = onSubmitFeedback(e, { rating, feedback });

          // Handle both sync and async functions
          if (result instanceof Promise) {
            await result;
          }
        }
        setFeedbackFormState(FormState.Submitted);
        setShowFeedbackForm(false);
      } catch (_error) {
        setFeedbackFormState(FormState.Error);
      }
    },
    [feedback, onSubmitFeedback, rating],
  );

  const handleCloseFeedback = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      resetFeedback();
      setShowFeedbackForm(false);
      onCloseFeedback?.(e);
    },
    [onCloseFeedback, resetFeedback],
  );

  const showMessageRating = !!onRatingChange;
  const showMessageFeedbackComponent =
    (showFeedbackForm && !!onSubmitFeedback) || isSubmitted;
  const hideThumbsDown = isSubmitted && rating === MessageRatingValue.Liked;
  const hideThumbsUp = isSubmitted && rating === MessageRatingValue.Disliked;

  const textareaProps = useMemo(
    () => ({
      'data-testid': FEEDBACK_TEXTAREA_TEST_ID,
      onChange: handleFeedbackChange,
      value: feedback,
    }),
    [handleFeedbackChange, feedback],
  );

  const submitButtonProps = useMemo(
    () => ({
      isLoading: isSubmitting,
      loadingText: 'Submitting...',
    }),
    [isSubmitting],
  );

  if (!isCompact) {
    return null;
  }

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div
        className={getContainerStyles({
          className,
          isSubmitted,
        })}
        {...rest}
      >
        <div className={actionBarStyles}>
          <div className={primaryActionsContainerStyles}>
            <IconButton
              aria-label="Copy message"
              onClick={handleCopy}
              title="Copy"
            >
              {copied ? <CheckmarkIcon /> : <CopyIcon />}
            </IconButton>
            {onClickRetry && (
              <IconButton
                aria-label="Retry message"
                onClick={onClickRetry}
                title="Retry"
              >
                <RefreshIcon />
              </IconButton>
            )}
          </div>
          {showMessageRating && (
            <>
              <div className={getDividerStyles(theme)} />
              <MessageRating
                // @ts-expect-error - react type issue: https://github.com/facebook/react/pull/24730
                inert={isSubmitState ? 'inert' : undefined}
                onChange={handleRatingChange}
                value={rating}
                hideThumbsDown={hideThumbsDown}
                hideThumbsUp={hideThumbsUp}
              />
            </>
          )}
        </div>
        {showMessageFeedbackComponent && (
          <InlineMessageFeedback
            errorMessage={errorMessage}
            label="Provide feedback"
            onClose={handleCloseFeedback}
            onSubmit={handleFeedbackSubmit}
            state={feedbackFormState}
            submitButtonProps={submitButtonProps}
            submitButtonText={submitButtonText}
            submittedMessage={submittedMessage}
            textareaProps={textareaProps}
            enableFadeAfterSubmit
          />
        )}
      </div>
    </LeafyGreenProvider>
  );
}

MessageActions.displayName = 'MessageActions';
