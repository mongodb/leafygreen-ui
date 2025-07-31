import { FormEvent, MouseEventHandler } from 'react';
import { InlineMessageFeedbackProps } from '@lg-chat/message-feedback';
import { MessageRatingValue } from '@lg-chat/message-rating';

import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export interface MessageActionsProps
  extends DarkModeProps,
    HTMLElementProps<'div'> {
  /**
   * Callback fired when the copy button is clicked.
   */
  onClickCopy: MouseEventHandler<HTMLButtonElement>;

  /**
   * Callback fired when the retry button is clicked.
   */
  onClickRetry: MouseEventHandler<HTMLButtonElement>;

  /**
   * Optional callback fired when the feedback form is closed by clicking
   * the close button.
   */
  onCloseFeedback?: InlineMessageFeedbackProps['onClose'];

  /**
   * Callback when the user submits the feedback form.
   * Receives the original form event, plus an options object with rating and comment.
   */
  onSubmitFeedback: (
    e: FormEvent<HTMLFormElement>,
    options: { rating: MessageRatingValue; feedback?: string },
  ) => void;

  /**
   * Optional text for the feedback form's submit button.
   * @default 'Submit'
   */
  submitButtonText?: InlineMessageFeedbackProps['submitButtonText'];

  /**
   * Optional success message to display after feedback is submitted.
   * Can be a string or a ReactNode.
   * @default 'Thanks for your feedback!'
   */
  submittedMessage?: InlineMessageFeedbackProps['submittedMessage'];
}
