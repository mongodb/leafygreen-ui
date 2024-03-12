import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export const MessageRatingValue = {
  Liked: 'liked',
  Disliked: 'disliked',
  Unselected: 'unselected',
};

export type MessageRatingValue =
  (typeof MessageRatingValue)[keyof typeof MessageRatingValue];

export interface MessageRatingProps
  extends HTMLElementProps<'div'>,
    DarkModeProps {
  /**
   * Determines the currently selected value of the radio buttons.
   * @default undefined
   */
  value?: MessageRatingValue;
  /**
   * Custom description text
   * @default "How was the response?"
   */
  description?: string;
  /**
   * Event handler called when the value of the underlying radio inputs are changed
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * Hides the thumbs up button
   * @default false
   */
  hideThumbsUp?: boolean;

  /**
   * Hides the thumbs down button
   * @default false
   */
  hideThumbsDown?: boolean;
}
