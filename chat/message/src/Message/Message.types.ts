import React from 'react';
import { LGMarkdownProps } from '@lg-chat/lg-markdown';

import { type DarkModeProps } from '@leafygreen-ui/lib';

export const MessageSourceType = {
  Markdown: 'markdown',
  Text: 'text',
} as const;

export type MessageSourceType =
  (typeof MessageSourceType)[keyof typeof MessageSourceType];

export interface MessageContentProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  /**
   * Rendered children; only string children are supported.
   */
  children: string;

  /**
   * Props passed to the internal ReactMarkdown instance
   */
  markdownProps?: Omit<LGMarkdownProps, 'children'>;

  /**
   * Determines the rendering method of the message
   * @default MessageSourceType.Text
   */
  sourceType?: MessageSourceType;
}

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
