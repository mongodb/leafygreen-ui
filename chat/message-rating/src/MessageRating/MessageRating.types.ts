import React from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export const MessageRatingValue = {
  Liked: 'liked',
  Disliked: 'disliked',
  Unselected: 'unselected',
};

export type MessageRatingValue =
  (typeof MessageRatingValue)[keyof typeof MessageRatingValue];

export interface MessageRatingProps
  extends React.ComponentPropsWithoutRef<'div'>,
    DarkModeProps {
  /**
   * Hides the thumbs down button
   * @default false
   */
  hideThumbsDown?: boolean;

  /**
   * Hides the thumbs up button
   * @default false
   */
  hideThumbsUp?: boolean;

  /**
   * Event handler called when the value of the underlying radio inputs are changed
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * Determines the currently selected value of the radio buttons.
   * @default undefined
   */
  value?: MessageRatingValue;
}
