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
import { InlineMessageFeedback } from '@lg-chat/message-feedback';
import { MessageRating, MessageRatingValue } from '@lg-chat/message-rating';

import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import RefreshIcon from '@leafygreen-ui/icon/dist/Refresh';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { FEEDBACK_TEXTAREA_TEST_ID } from '../constants';

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
  onClickCopy,
  onClickRetry,
  onCloseFeedback,
  onSubmitFeedback,
  submitButtonText = 'Submit',
  submittedMessage = 'Thanks for your feedback!',
  ...rest
}: MessageActionsProps) {
  const { darkMode, theme } = useDarkMode(darkModeProp);
  const { variant } = useLeafyGreenChatContext();
  const isCompact = variant === Variant.Compact;

  const [rating, setRating] = useState<MessageRatingValue>(
    MessageRatingValue.Unselected,
  );
  const [feedback, setFeedback] = useState<string | undefined>(undefined);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (isSubmitted) {
        return;
      }
      setRating(e.target.value as MessageRatingValue);
    },
    [isSubmitted],
  );

  const handleFeedbackChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (isSubmitted) {
        return;
      }
      setFeedback(e.target.value);
    },
    [isSubmitted],
  );

  const handleFeedbackSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      if (rating === MessageRatingValue.Unselected || !feedback) {
        return;
      }

      onSubmitFeedback?.(e, { rating, feedback });
      setIsSubmitted(true);
    },
    [feedback, onSubmitFeedback, rating],
  );

  const handleCloseFeedback = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      setRating(MessageRatingValue.Unselected);
      onCloseFeedback?.(e);
    },
    [onCloseFeedback],
  );

  const showPrimaryActions = !!onClickCopy || !!onClickRetry;
  const showMessageRating = !!onSubmitFeedback;
  const showDivider = showPrimaryActions && showMessageRating;
  const showFeedbackForm =
    showMessageRating && rating !== MessageRatingValue.Unselected;

  const textareaProps = useMemo(
    () => ({
      'data-testid': FEEDBACK_TEXTAREA_TEST_ID,
      onChange: handleFeedbackChange,
      value: feedback,
    }),
    [handleFeedbackChange, feedback],
  );

  if (!isCompact || (!showPrimaryActions && !showMessageRating)) {
    return null;
  }

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div className={getContainerStyles({ className, isSubmitted })} {...rest}>
        <div className={actionBarStyles}>
          {showPrimaryActions && (
            <div className={primaryActionsContainerStyles}>
              {onClickCopy && (
                <IconButton
                  aria-label="Copy message"
                  onClick={onClickCopy}
                  title="Copy"
                >
                  <CopyIcon />
                </IconButton>
              )}
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
          )}
          {showDivider && <div className={getDividerStyles(theme)} />}
          {showMessageRating && (
            <MessageRating
              // @ts-expect-error - react type issue: https://github.com/facebook/react/pull/24730
              inert={isSubmitted ? 'inert' : undefined}
              onChange={handleRatingChange}
              value={rating}
            />
          )}
        </div>
        {showFeedbackForm && (
          <InlineMessageFeedback
            isSubmitted={isSubmitted}
            label="Provide feedback"
            onClose={handleCloseFeedback}
            onSubmit={handleFeedbackSubmit}
            submitButtonText={submitButtonText}
            submittedMessage={submittedMessage}
            textareaProps={textareaProps}
          />
        )}
      </div>
    </LeafyGreenProvider>
  );
}

MessageActions.displayName = 'MessageActions';
