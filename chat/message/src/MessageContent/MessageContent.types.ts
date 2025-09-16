import React from 'react';
import { LGMarkdownProps } from '@lg-chat/lg-markdown';

import { BaseFontSize } from '@leafygreen-ui/tokens';

export const MessageSourceType = {
  Markdown: 'markdown',
  Text: 'text',
} as const;

export type MessageSourceType =
  (typeof MessageSourceType)[keyof typeof MessageSourceType];

export interface MessageContentProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  /**
   * Base font size
   */
  baseFontSize?: BaseFontSize;

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
