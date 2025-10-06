import React, { ChangeEvent, FormEvent, MouseEventHandler } from 'react';
import { InlineMessageFeedbackProps } from '@lg-chat/message-feedback';
import { MessageRatingValue } from '@lg-chat/message-rating';

import { DarkModeProps } from '@leafygreen-ui/lib';

export interface MessageActionsProps
  extends DarkModeProps,
    React.ComponentProps<'div'> {
  /**
   * Optional error message to display when feedback submission fails.
   * @default 'Oops, please try again.'
   */
  errorMessage?: InlineMessageFeedbackProps['errorMessage'];

  /**
   * Optional callback fired when the copy button is clicked.
   */
  onClickCopy?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Optional callback fired when the retry button is clicked.
   * @remarks if not provided, the retry button will not be rendered
   */
  onClickRetry?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Optional callback fired when the feedback form is closed by clicking
   * the close button.
   */
  onCloseFeedback?: InlineMessageFeedbackProps['onClose'];

  /**
   * Optional callback fired when the user clicks the like or dislike button.
   * Receives the original change event and an options object with the rating.
   * @remarks if not provided, the rating buttons will not be rendered
   */
  onRatingChange?: (
    e: ChangeEvent<HTMLInputElement>,
    options?: { rating: MessageRatingValue },
  ) => void;

  /**
   * Optional callback when the user submits the feedback form.
   * Receives the original form event, plus an options object with rating and feedback.
   * @remarks if not provided, the feedback form will not be rendered
   */
  onSubmitFeedback?: (
    e: FormEvent<HTMLFormElement>,
    options?: { rating: MessageRatingValue; feedback: string },
  ) => Promise<void> | void;

  /**
   * Optional text for the feedback form's submit button.
   * @default 'Submit'
   */
  submitButtonText?: InlineMessageFeedbackProps['submitButtonText'];

  /**
   * Optional success message to display after feedback is submitted.
   * @default 'Thanks for your feedback!'
   */
  submittedMessage?: InlineMessageFeedbackProps['submittedMessage'];
}
