import React from 'react';

import { type DarkModeProps } from '@leafygreen-ui/lib';

import { type MessageContentProps } from '../MessageContent';

export interface MessageProps
  extends Omit<MessageContentProps, 'children'>,
    DarkModeProps {
  /**
   * Component children
   */
  children?: React.ReactNode;

  /**
   * Indicates if the message is from the current user
   * @default true
   */
  isSender?: boolean;

  /**
   * Message body text passed to LGMarkdown
   */
  messageBody?: string;
}
